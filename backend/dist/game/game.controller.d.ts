import { GameService } from "./game.service";
import { HistoryDto } from "./dto";
export declare class GameController {
    private gameService;
    constructor(gameService: GameService);
    addMatch(match: HistoryDto): Promise<{
        msg: string;
    }>;
}
