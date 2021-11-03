import {
    Controller,
    Get,
    Post, Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import {Request, Response} from "express";
import { UsersService } from "./users.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { SessionGuard } from "../auth/session.guard";
import { parse } from "url";
import { ViewService } from "../view/view.service";

@Controller()
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private viewService: ViewService
    ) {}

    @UseGuards(SessionGuard)
    @Get("api/user/validate")
    async findAll(@Req() req): Promise<any> {
        return { login: true, user: req.user };
    }

    @UseGuards(LocalAuthGuard)
    @Post("api/user/signin")
    async login(@Req() req, @Res() res) {
        return req.logIn(req.user, (err) => {
            return res.send({ login: true });
        });
    }

    @Get("login")
    public async personalityList(@Req() req: Request, @Res() res: Response) {
        const parsedUrl = parse(req.url, true);
        // @ts-ignore
        req.language = req.headers["accept-language"] || "en";

        await this.viewService
            .getNextServer()
            .render(
                req,
                res,
                "/login",
                Object.assign(parsedUrl.query, {})
            );
    }
}
