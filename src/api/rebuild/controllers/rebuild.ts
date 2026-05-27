export default {
  async trigger(ctx: any) {
    const webhookUrl = process.env.COOLIFY_DEPLOY_WEBHOOK;
    if (!webhookUrl) {
      return ctx.badRequest('COOLIFY_DEPLOY_WEBHOOK environment variable is not defined.');
    }
    try {
      const url = new URL(webhookUrl);
      const token = url.searchParams.get('token');
      url.searchParams.delete('token');

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        return ctx.internalServerError(`Coolify deployment failed with status ${res.status}: ${errorText}`);
      }
      return ctx.send({ 
        success: true,
        message: 'Static site build pipeline initiated in Coolify successfully.' 
      });
    } catch (error: any) {
      return ctx.internalServerError(`Network error trying to contact Coolify: ${error.message}`);
    }
  },
};