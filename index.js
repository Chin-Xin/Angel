const LinebotSDK = require("@line/bot-sdk");

const koa = require("koa");
const koaBodyparse = require("koa-bodyparser");
const koaRouter = require("koa-router");

const channelSecret = process.env.channelSecret;
const channelAccessToken = process.env.channelAccessToken;

const lineAPI  = new Line
botSDK.Client({
    "channelSecret": channelSecret,
    "channelAccessToken": channelAccessToken
});

const app = new  koa();
const router = new koaRouter();

app.use(koaBodyparse());

router.post("/", function(ctx) {
    if(LineBotSDK.validateSignature(ctx.request.body, channelSecret, ctx.request.headers['x-line-signature'])){
        ctx.status = 200;
        ctx.request.body.events.map(MessageHandler);
    }else{
        ctx.status = 401;
        ctx.body = "Authorize failed.";
    }
});

app.use(router.routes());

const server = app.listen(porcess.env.PORT || 8080);

async function MessageHandler(event){
    console.log(event);
}