"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICE_PRECISION = exports.UPDATE_POSITION_EVENT = exports.INCREASE_POSITION_EVENT = exports.VAULT = void 0;
exports.VAULT = "0x489ee077994B6658eAfA855C308275EAd8097C4A";
exports.INCREASE_POSITION_EVENT = "event IncreasePosition(bytes32 key, address account, address collateralToken, address indexToken,uint256 collateralDelta,uint256 sizeDelta,bool isLong,uint256 price,uint256 fee)";
exports.UPDATE_POSITION_EVENT = "event UpdatePosition(bytes32 key, uint256 size, uint256 collateral, uint256 averagePrice, uint256 entryFundingRate, uint256 reserveAmount, int256 realisedPnl)";
exports.PRICE_PRECISION = Math.pow(10, 30);
