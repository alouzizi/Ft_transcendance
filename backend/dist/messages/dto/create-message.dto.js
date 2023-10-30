"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.SendMessageDto = exports.CreateMessageDto = void 0;
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
class SendMessageDto {
}
exports.SendMessageDto = SendMessageDto;
var Status;
(function (Status) {
    Status[Status["ACTIF"] = 0] = "ACTIF";
    Status[Status["INACTIF"] = 1] = "INACTIF";
    Status[Status["WRITE"] = 2] = "WRITE";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=create-message.dto.js.map