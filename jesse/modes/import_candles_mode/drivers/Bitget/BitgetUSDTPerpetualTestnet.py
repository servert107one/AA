from .BitgetUSDTPerpetualMain import BitgetUSDTPerpetualMain
from jesse.enums import exchanges


class BitgetUSDTPerpetualTestnet(BitgetUSDTPerpetualMain):
    def __init__(self) -> None:
        super().__init__(
            name=exchanges.BITGET_USDT_PERPETUAL_TESTNET,
        )
