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
import { parse } from "url";
import { Request, Response } from "express";
import { ViewService } from "../view/view.service";
import { PersonalityService } from "./personality.service";
import { ClaimService } from "../claim/claim.service";
import { SessionGuard } from "../auth/session.guard";

@Controller()
export class PersonalityController {
    private readonly logger = new Logger("PersonalityController");
    constructor(
        private claimService: ClaimService,
        private personalityService: PersonalityService,
        private viewService: ViewService
    ) {}

    @Get("api/personality")
    async listAll(@Query() query) {
        return this.personalityService.combinedListAll(query);
    }

    // @UseGuards(SessionGuard)
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

    // @UseGuards(SessionGuard)
    @Put("api/personality/:id")
    async update(@Param() params, @Body() body) {
        return this.personalityService.update(params.id, body).catch((err) => {
            this.logger.error(err);
        });
    }

    // @UseGuards(SessionGuard)
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

    @Get("personality/search")
    public async personalityCreateSearch(@Req() req: Request, @Res() res: Response) {
        const parsedUrl = parse(req.url, true);

        await this.viewService
            .getNextServer()
            .render(
                req,
                res,
                "/personality-create-search",
                Object.assign(parsedUrl.query)
            );
    }

    @Get("personality/:slug")
    public async personalityPage(@Req() req: Request, @Res() res: Response) {
        const parsedUrl = parse(req.url, true);
        const language = "en";

        const personality = await this.personalityService.getBySlug(
            req.params.slug,
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

    @Get("personality/:personalitySlug/claim/:claimSlug")
    public async personalityClaimPage(@Req() req: Request, @Res() res: Response) {
        const parsedUrl = parse(req.url, true);
        const language = "en";

        const personality = await this.personalityService.getBySlug(
            req.params.personalitySlug,
            language
        );

        const claim = await this.claimService.getByPersonalityIdAndClaimSlug(
            personality._id,
            req.params.claimSlug
        );

        await this.viewService
            .getNextServer()
            .render(
                req,
                res,
                "/claim-page",
                Object.assign(parsedUrl.query, { personality, claim })
            );
    }

    @Get("personality")
    public async personalityList(@Req() req: Request, @Res() res: Response) {
        const parsedUrl = parse(req.url, true);

        await this.viewService
            .getNextServer()
            .render(
                req,
                res,
                "/personality-list",
                Object.assign(parsedUrl.query, {})
            );
    }
}
