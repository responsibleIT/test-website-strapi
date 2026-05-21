export default {
  async trigger(ctx: any) {
    const webhookUrl = process.env.COOLIFY_DEPLOY_WEBHOOK;

    if (!webhookUrl) {
      return ctx.badRequest('COOLIFY_DEPLOY_WEBHOOK is not set');
    }

    const res = await fetch(webhookUrl, { method: 'GET' });

    if (!res.ok) {
      return ctx.internalServerError(`Coolify webhook failed: ${res.status}`);
    }

    ctx.send({ message: 'Rebuild triggered' });
  },
};