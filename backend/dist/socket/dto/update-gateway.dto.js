"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGatewayDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_gateway_dto_1 = require("./create-gateway.dto");
class UpdateGatewayDto extends (0, mapped_types_1.PartialType)(create_gateway_dto_1.CreateGatewayDto) {
}
exports.UpdateGatewayDto = UpdateGatewayDto;
//# sourceMappingURL=update-gateway.dto.js.map