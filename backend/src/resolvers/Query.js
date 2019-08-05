const { forwardTo} = require('prisma-binding');

const Query = {
   async chooks(parent, args, ctx, info){
       const chooks = await ctx.db.query.chooks();
       return chooks;
   },
   async vhooks(parent, args, ctx, info){
    const vhooks = await ctx.db.query.vhooks();
    return vhooks;
    },
    // async vhook(parent, args, ctx, info){
    //   const vhook = await ctx.db.query.vhook();
    //   return vhook;
    // },


    vhook: forwardTo('db'),

    me(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
          return null;
        }
        return ctx.db.query.user(
          {
            where: { id: ctx.request.userId },
          },
          info
        );
      },
      async order(parent, args, ctx, info){
        // make sure logged in
        if(!ctx.request.userId) {
          throw new Error('You need to log in!');
        }

        // query the current order
        const order = await ctx.db.query.order({
          where: {id: args.id},
        }, info);

        // check permissions
        const ownsOrder = order.user.id === ctx.request.userId;
        if(!ownsOrder){
          throw new Error ('This is not your order!');
        }
        // return the order
        return order;
      },
      async orders(parent, args, ctx, info) {
        const { userId } = ctx.request;
        if (!userId) {
          throw new Error('you must be signed in!');
        }
        return ctx.db.query.orders(
          {
            where: {
              user: { id: userId },
            },
          },
          info
        );
      },     
};

module.exports = Query;
