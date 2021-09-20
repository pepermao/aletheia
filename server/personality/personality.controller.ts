import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    Req,
    Res
} from "@nestjs/common";
import {parse} from "url";
import {Request, Response} from "express";

import { ViewService } from "../view/view.service";
import { PersonalityService } from "./personality.service";
import { SessionGuard } from "../auth/session.guard";

@Controller()
export class PersonalityController {
    private readonly logger = new Logger("PersonalityController");
    constructor(
        private personalityService: PersonalityService,
        private viewService: ViewService
    ) {}

    @Get("api/personality")
    async listAll(@Query() query) {
        return this.personalityService.combinedListAll(query);
    }

    @UseGuards(SessionGuard)
    @Post("api/personality")
    async create(@Body() body) {
        try {
            return this.personalityService.create(body);
        } catch (error) {
            if (
                error.name === "MongoError" &&
                error.keyPattern &&
                error.keyPattern.wikidata
            ) {
                error.message = `Personality with wikidata id ${error.keyValue.wikidata} already exists`;
            }
            this.logger.error(error);
        }
    }

    @Get("api/personality/:id")
    async get(@Param() params, @Query() query) {
        return this.personalityService
            .getById(params.id, query.language)
            .catch((err) => {
                this.logger.error(err);
            });
    }

    @UseGuards(SessionGuard)
    @Put("api/personality/:id")
    async update(@Param() params, @Body() body) {
        return this.personalityService.update(params.id, body).catch((err) => {
            this.logger.error(err);
        });
    }

    @UseGuards(SessionGuard)
    @Delete("api/personality/:id")
    async delete(@Param() params) {
        try {
            await this.personalityService.delete(params.id);
            return { message: "Personality successfully deleted" };
        } catch (error) {
            this.logger.error(error);
        }
    }

    @Get("api/personality/:id/reviews")
    getReviewStats(@Param() params) {
        return this.personalityService
            .getReviewStats(params.id)
            .catch((err) => {
                this.logger.error(err);
            });
    }

    @Get("personality/:id")
    public async personalityPage(@Req() req: Request, @Res() res: Response) {
        const parsedUrl = parse(req.url, true);
        const language = "en";

        console.log(req.params)

        const personality = await this.personalityService.getById(
            req.params.id,
            language
        );

        await this.viewService
            .getNextServer()
            .render(
                req,
                res,
                "/personality-page",
                Object.assign(parsedUrl.query, { personality })
            );
    }
}
