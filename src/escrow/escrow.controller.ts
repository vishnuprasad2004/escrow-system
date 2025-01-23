import {Body, Controller, Get, HttpStatus, Post, Put, Res} from "@nestjs/common";
import { EscrowService } from "./escrow.service";
import { CreateEscrowDto, UpdateEscrowDto } from "./escrow.dto";

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Get()
  async getEscrows() {
    const allEscrows = await this.escrowService.getEscrows();
    return {message: "Escrows fetched successfully",allEscrows}; 
  }

  @Post()
  async createEscrowTransaction(@Body() escrowBodyReq:CreateEscrowDto, @Res() res) {
    const response = await this.escrowService.createEscrowTransaction(escrowBodyReq);
    res.status(HttpStatus.CREATED).json(response);
  }

  @Put()
  async updateEscrow(@Body() { pendingTransactionsID, status }:UpdateEscrowDto) {
    return this.escrowService.processEscrowTransaction(pendingTransactionsID, status);
  }
}