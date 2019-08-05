const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const stripe = require('../stripe');

const Mutations = {
    async createVhook(parent, args, ctx, info){
        const vhook = await ctx.db.mutation.createVhook({
            data: {
                ...args
            }
        }, info);
        return vhook;
    },

    updateVhook(parent, args, ctx, info){
        //take copy of updates
        const updates = {...args};
        //remove the ID from updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateVhook({
            data: updates,
            where: {
                id: args.id
            }
        }, info
        );
    },

    async deleteVhook(parent, args, ctx, info){
        const where = { id: args.id};
        //Find the item
        const vhook = await ctx.db.query.vhook({ where }, `{id part_no }`);
        //Check if they own item and have permission


        //Delete it
        return ctx.db.mutation.deleteVhook({ where }, info);
    },

    async signup(parent, args, ctx, info){
        args.email = args.email.toLowerCase();
        // hash password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in db
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ['USER']},
            },
        }, 
        info
        ); 
        // create JWT token
        const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET);
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        return user;
    },  
    async signin(parent, { email, password}, ctx, info){
        // check if user with that email
        const user = await ctx.db.query.user({ where: { email} });
        if(!user){
            throw new Error(`No such user found for email ${email}`);
        }

        // check password
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            throw new Error(`Invalid Password`)
        }
        // generate jwt token
        const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET);
        // set cookie with token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        // return user
        return user;
    },
    signout(parent, args, ctx, info){
        ctx.response.clearCookie('token');
        return {message: 'Goodbye!'};
    },
    async requestReset(parent, args, ctx, info) {
        // 1. Check if this is a real user
        const user = await ctx.db.query.user({ where: { email: args.email } });
        if (!user) {
          throw new Error(`No such user found for email ${args.email}`);
        }
        // 2. Set a reset token and expiry on that user
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
          where: { email: args.email },
          data: { resetToken, resetTokenExpiry },
        });
        // 3. Email them that reset token
        const mailRes = await transport.sendMail({
          from: 'argonliam@gmail.com',
          to: user.email,
          subject: 'Your Password Reset Token',
          html: makeANiceEmail(`Your Password Reset Token is here!
          \n\n
          <a href="${process.env
            .FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
        });
    
        // 4. Return the message
        
        return { message: 'Thanks!' };
      },
      async resetPassword(parent, args, ctx, info){
          //check if passwords match
            if (args.password !== args.confirmPassword){
                throw new Error('Passwords do not match');
            }
          // check if it is a legit token
            const [user] = await ctx.db.query.users({
                where: {
                    resetToken: args.resetToken,
                    resetTokenExpiry_gte: Date.now() - 3600000
                }
            });
            if(!user){
                throw new Error('This token is either invalid or expired!');
            }

          // hash new pasword
            const password = await bcrypt.hash(args.password, 10);

          // save the new password and remove old token
            const updatedUser = await ctx.db.mutation.updateUser({
                where: { email: user.email},
                data: {
                    password,
                    resetToken: null,
                    resetTokenExpiry: null,
                },
            });
          // generate the jwt
            const token = jwt.sign({userId: updatedUser.id},
                process.env.APP_SECRET); 
          // set the jwt cookie
            ctx.response.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365
            })

          // return the new user
            return updatedUser;
      },
      async addToCart(parent, args, ctx, info) {
          // Make sure signed in
          const { userId } = ctx.request;
          if(!userId){
              throw new Error('You must be signed in');
          }
          // Query User cart
          const [existingCartItem] = await ctx.db.query.cartItems({
              where: {
                user: { id: userId},
                vhook: { id: args.id},
              }    
          });
          
          // Check if that item is already in cart and incremenet by 1 if necessary
          if(existingCartItem){
              console.log('Item already in cart');
              return ctx.db.mutation.updateCartItem({
                  where: {id: existingCartItem.id},
                  data: { quantity: existingCartItem.quantity +1},
              }, info);
          }
          // If not in cart, create new cart item for User
          return ctx.db.mutation.createCartItem({
              data: {
                  user: {
                      connect: { id: userId},
                  },
                  vhook: {
                      connect: { id: args.id }
                  }
              }
          }, info);
      },
      async removeFromCart(parent, args, ctx, info){
          // Find the item
            const cartItem = await ctx.db.query.cartItem(
                {
                where: {
                    id: args.id,
                },
            },
             `{ id, user {id}}`
            );
          //Make sure they own the item
          if(!cartItem) throw new Error ('No cart item found');
          if(cartItem.user.id !== ctx.request.userId){
              throw new Error('You cannot do that action!')
          }
          return ctx.db.mutation.deleteCartItem(
            {
              where: {id: args.id},
            },
          info
          );
      },
      async createOrder(parent, args, ctx, info) {
        // 1. Query the current user and make sure they are signed in
        const { userId } = ctx.request;
        if (!userId) throw new Error('You must be signed in to complete this order.');
        const user = await ctx.db.query.user(
          { where: { id: userId } },
          `{
          id
          name
          email
          cart {
            id
            quantity
            vhook { id part_no wire_diam length arch_diam qty_bag price_bag price_bag_10bags  }
          }}`
        );
        // 2. recalculate the total for the price
        const amount = user.cart.reduce(
          (tally, cartItem) => tally + cartItem.vhook.price_bag * cartItem.quantity,
          0
        );
        console.log(`Going to charge for a total of ${amount}`);
        // 3. Create the stripe charge (turn token into $$$)
        const charge = await stripe.charges.create({
          amount,
          currency: 'USD',
          source: args.token,
        });
        // 4. Convert the CartItems to OrderItems
        const orderItems = user.cart.map(cartItem => {
          const orderItem = {
            ...cartItem.vhook,
            quantity: cartItem.quantity,
            user: { connect: { id: userId } },
          };
          delete orderItem.id;
          return orderItem;
        });
    
        // 5. create the Order
        const order = await ctx.db.mutation.createOrder({
          data: {
            total: charge.amount,
            charge: charge.id,
            vhooks: { create: orderItems },
            user: { connect: { id: userId } },
          },
        });
        // 6. Clean up - clear the users cart, delete cartItems
        const cartItemIds = user.cart.map(cartItem => cartItem.id);
        await ctx.db.mutation.deleteManyCartItems({
          where: {
            id_in: cartItemIds,
          },
        });
        // 7. Return the Order to the client
        return order;
      },

};

module.exports = Mutations;
