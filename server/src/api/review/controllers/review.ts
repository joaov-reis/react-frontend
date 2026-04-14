      /**
 * cart-item controller
 */

import { factories } from "@strapi/strapi";
import { Context } from "koa";

export default factories.createCoreController(
  "api::review.review",
  ({ strapi }) => ({
    async find(ctx: Context) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized();

      const entities = await strapi.entityService.findMany(
        "api::review.review",
        {
          ...ctx.query,
          filters: {
            ...(ctx.query.filters as object),
            user: user.id,
          },
        },
      );

      const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitizedEntities);
    },

    async create(ctx: Context) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized();

      const { data } = ctx.request.body;

      const entity = await strapi.entityService.create(
        "api::review.review",
        {
          data: {
            rating: data.rating || 1,
            movie: data.movie,
            user: user.id,
            publishedAt: new Date(),
          },
        },
      );

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  }),
);
