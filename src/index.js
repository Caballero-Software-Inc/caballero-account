'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json({ limit: '5mb' }));
app.use(express_1.default.json()); // Parse JSON bodies (as sent by API clients)
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () { return console.log("Listening to " + PORT); });
app.disable('etag'); //to guarantee that res.statusCode = 200, unless there is an error
app.use(accountRoutes_1.default);
