from .BinanceMain import BinanceMain
from jesse.enums import exchanges


class BinanceUSSpot(BinanceMain):
    def __init__(self) -> None:
        from .BinanceSpot import BinanceSpot

        super().__init__(
            name=exchanges.BINANCE_US_SPOT,
            backup_exchange_class=BinanceSpot
        )
