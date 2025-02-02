#property copyright "Copyright 2017-2021, Artur Zas"
#define VERSION "1.21"
#property version VERSION
#property description "Example EA: Trading based on 2 moving average crossover." 
#property description "MA1 && MA2 need to be enabled on the inicator creating the chart." 
#property description "MA1 - Fast moving average" 
#property description "MA2 - Slow moving average" 
#property description " "
#property description "GNU General Public License v3.0"

//
// Uncomment only ONE of the 5 directives listed below and recompile
// -----------------------------------------------------------------
//
//#define EA_ON_RANGE_BARS          // Use EA on RangeBar chart 
#define EA_ON_RENKO               // Use EA on Renko charts
//#define EA_ON_XTICK_CHART         // Use EA on XTick Chart (obsolete)
//#define EA_ON_TICK_VOLUME_CHART   // Use EA on Tick & Volume Bar Chart
//#define EA_ON_SECONDS_CHART       // Use EA on Seconds Interval chart
//#define EA_ON_LINEBREAK_CHART     // Use EA on LineBreak charts

//#define DEVELOPER_VERSION // used when I develop ;) should always be commented out

// Uncomment the directive below and recompile if EA is used with P-Renko BR Ultimate
// ----------------------------------------------------------------------------------
//
//#define P_RENKO_BR_PRO     // Use in P-Renko BR Ultimate version

//
// Uncomment the directive below and recompile for use in a backtest only
// ----------------------------------------------------------------------
//
// #define SHOW_INDICATOR_INPUTS

// Include all needed files

#ifdef EA_ON_RANGE_BARS
   #include <AZ-INVEST/SDK/RangeBars.mqh>
   RangeBars *customBars = NULL;
#endif
#ifdef EA_ON_RENKO
   #include <AZ-INVEST/SDK/MedianRenko.mqh>
   MedianRenko *customBars = NULL;
#endif
#ifdef EA_ON_XTICK_CHART
   #include <AZ-INVEST/SDK/TickChart.mqh>
   TickChart *customBars = NULL;
#endif
#ifdef EA_ON_TICK_VOLUME_CHART
   #include <AZ-INVEST/SDK/VolumeBarChart.mqh>
   TickChart *customBars = NULL;
#endif
#ifdef EA_ON_SECONDS_CHART
   #include <AZ-INVEST/SDK/SecondsChart.mqh>
   SecondsChart *customBars = NULL;
#endif
#ifdef EA_ON_LINEBREAK_CHART
   #include <AZ-INVEST/SDK/LineBreakChart.mqh>
   LineBreakChart *customBars = NULL;
#endif

#include <AZ-INVEST/SDK/TimeControl.mqh>
#include <AZ-INVEST/SDK/TradeFunctions.mqh>
#include <AZ-INVEST/SDK/TradeManager.mqh>

enum ENUM_TRADE_DIRECTION 
{
   TRADE_DIRECTION_BUY = POSITION_TYPE_BUY,    // Buy
   TRADE_DIRECTION_SELL = POSITION_TYPE_SELL,  // Sell
   TRADE_DIRECTION_ALL = 1000,                 // Buy & Sell
};

#ifdef SHOW_INDICATOR_INPUTS
   input group "### EA parameters"
#endif
input double   Lots = 0.1;                                              // Traded lots
input uint     StopLoss = 100;                                          // Stop Loss (in points)
input uint     TakeProfit = 300;                                        // Take profit (in points)
input ENUM_TRADE_DIRECTION ValidTradeDirection = TRADE_DIRECTION_ALL;   // Valid trading type
input bool     ForceSR = false;                                         // Force Stop & Reverse
input bool     ReverseOnMACrossInsideGap = true;                        // Reverse trade if MA cross inside a gap
input group    "### Trading schedule (Non stop if start = 0 & end = 0)"
input string   Start="9:00";                                            // Start trading at 
input string   End="17:55";                                             // End trading at
input bool     CloseTradeAfterTradingHours = false;                     // Close trade after trading hours
input group    "### Trade management";
input int      InpBEPoints          = 0;                                // BreakEven (Points) [ 0 = OFF ]
input int      InpTrailByPoints     = 0;                                // Trail by (Points) [ 0 = OFF ]
input int      InpTrailStartPoints  = 150;                              // Start trailing after (Points)
input int      InpPartialCloseAtProfitPoints = 0;                       // Partial close at (Points) [ 0 = OFF ]
input int      InpPartialClosePercentage = 50;                          // Partial close %
input group    "### Misc";
input ulong    MagicNumber=5150;                                        // Assign trade ID 
input ulong    DeviationPoints = 0;                                     // Maximum deviation (in points)
input double   ManualTickSize = 0.000;                                  // Tick Size (0 = auto detect) 
input int      NumberOfRetries = 50;                                    // Maximum number of retries
input int      BusyTimeout_ms = 1000;                                   // Wait [ms] before retry on busy errors
input int      RequoteTimeout_ms = 250;                                 // Wait [ms] before retry on requotes

// Global data buffers 

double MA1[];  // Buffer for moving average 1 
double MA2[];  // Buffer for moving average 2 

// Read 3 rates & 3 MA values starting from current (uncompleted) bar

int startAtBar   = 0;   
int numberOfBars = 3;   

// EA variables

CMarketOrder   *marketOrder = NULL;
CTimeControl   *timeControl = NULL;
CTradeManager  *tradeManager = NULL;

ulong currentTicket;
CTradeManagerState tradeManagerState;
ENUM_POSITION_TYPE currentPositionType;
ENUM_POSITION_TYPE signal;
ENUM_POSITION_TYPE validation;

#ifdef EA_ON_RANGE_BARS
   static int _MA1 = RANGEBAR_MA1;
   static int _MA2 = RANGEBAR_MA2;
#endif
#ifdef EA_ON_RENKO
   static int _MA1 = RENKO_MA1;
   static int _MA2 = RENKO_MA2;
#endif
#ifdef EA_ON_XTICK_CHART
   static int _MA1 = TICKCHART_MA1;
   static int _MA2 = TICKCHART_MA2;
#endif
#ifdef EA_ON_TICK_VOLUME_CHART
   static int _MA1 = VOLUMECHART_MA1;
   static int _MA2 = VOLUMECHART_MA2;
#endif
#ifdef EA_ON_SECONDS_CHART
   static int _MA1 = SECONDS_MA1;
   static int _MA2 = SECONDS_MA2;
#endif
#ifdef EA_ON_LINEBREAK_CHART
   static int _MA1 = LINEBREAK_MA1;
   static int _MA2 = LINEBREAK_MA2;
#endif

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   if(customBars == NULL)
   {
      #ifdef EA_ON_RANGE_BARS
         customBars = new RangeBars(MQLInfoInteger((int)MQL5_TESTING) ? false : true);
      #endif
      #ifdef EA_ON_RENKO
         customBars = new MedianRenko(MQLInfoInteger((int)MQL5_TESTING) ? false : true);
      #endif
      #ifdef EA_ON_XTICK_CHART   
         customBars = new TickChart(MQLInfoInteger((int)MQL5_TESTING) ? false : true);
      #endif   
      #ifdef EA_ON_TICK_VOLUME_CHART
         customBars = new TickChart(MQLInfoInteger((int)MQL5_TESTING) ? false : true);
      #endif   
      #ifdef EA_ON_SECONDS_CHART
         customBars = new SecondsChart(MQLInfoInteger((int)MQL5_TESTING) ? false : true);
      #endif
      #ifdef EA_ON_LINEBREAK_CHART
         customBars = new LineBreakChart(MQLInfoInteger((int)MQL5_TESTING) ? false : true);
      #endif
   }
   
   customBars.Init();
   if(customBars.GetHandle() == INVALID_HANDLE)
      return(INIT_FAILED);
   
   signal = POSITION_TYPE_NONE;
   
   CMarketOrderParameters params;
   {
      params.m_async_mode = false;
      params.m_magic = MagicNumber;
      params.m_deviation = DeviationPoints;
      params.m_type_filling = ORDER_FILLING_FOK;
      
      params.numberOfRetries = NumberOfRetries;
      params.busyTimeout_ms = BusyTimeout_ms; 
      params.requoteTimeout_ms = RequoteTimeout_ms;         
   }
   
   marketOrder = new CMarketOrder(params);
   
   if(timeControl == NULL)
   {
      timeControl = new CTimeControl();
   }
   
   timeControl.SetValidTraingHours(Start,End);
   
   //
   // Init TradeManager
   //        

   CTradeManagerParameters params2;
   {
      params2.BEPoints           = InpBEPoints;
      params2.TrailByPoints      = InpTrailByPoints;
      params2.TrailStartPoints   = InpTrailStartPoints;
      params2.PartialCloseAtProfitPoints = InpPartialCloseAtProfitPoints;
      params2.PartialClosePercentage = InpPartialClosePercentage;      
   }
        
   if(tradeManager == NULL)
   {
      tradeManager = new CTradeManager(params2, marketOrder);
   }
      
   return INIT_SUCCEEDED;
}
//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   customBars.Deinit();

   //  delete TimeControl class
   
   if(timeControl != NULL)
   {
      delete timeControl;
      timeControl = NULL;
   }
      
   //  delete MarketOrder class
   
   if(marketOrder != NULL)
   {
      delete marketOrder;
      marketOrder = NULL;
   }
  
   // delete MedianRenko class
   
   if(customBars != NULL)
   {
      delete customBars;
      customBars = NULL;
   }   
            
   if(tradeManager != NULL)
   {
      delete tradeManager;      
      tradeManager = NULL;
   }

   Comment("");
}
//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   if(marketOrder == NULL || customBars == NULL || timeControl == NULL || tradeManager == NULL)
      return;
      
   // trade management
      
   if(marketOrder.IsOpen(currentTicket, _Symbol, MagicNumber))
   {
      // checks done on every tick

      if(!timeControl.IsTradingTimeValid())
      {
         if(marketOrder.IsOpen(currentTicket,_Symbol,MagicNumber))
         {
            if(currentTicket > 0 && CloseTradeAfterTradingHours)
            {
               // close position outside of trading hours
               marketOrder.Close(currentTicket);
            }
         }

         return;
      }
                 
      tradeManager.Manage(currentTicket, tradeManagerState);               
   }      
      
   // Signal handler      
   
   if(customBars.IsNewBar())
   {
      if(timeControl.IsScheduleEnabled())
      {
         Comment("EA trading schedule ON ("+Start+" to "+End+") | trading enabled = "+(string)timeControl.IsTradingTimeValid());
      }
      else
      {
         Comment("EA trading schedule OFF");
      }            
         
      //
      //  Get moving average values for current, last completed bar and the bar before that...
      //
      
      if(!customBars.GetMA(_MA1,MA1,startAtBar,numberOfBars))
      {
         Print("Error getting values from MA1 - please enable MA1 on chart");
      }
      else if(!customBars.GetMA(_MA2,MA2,startAtBar,numberOfBars))
      {
         Print("Error getting values from MA2 - please enable MA2 on chart");      
      }
      else
      {
        
         signal = MovingAverageCross();
         validation = MovingAverageValidation();
  
         if(timeControl.IsScheduleEnabled())
         {
            Comment("EA trading schedule ("+Start+" to "+End+") | trading enabled = "+(string)timeControl.IsTradingTimeValid()+
           // "\n MA1 [2]: "+DoubleToString(MA1[2],_Digits)+" [1]: "+DoubleToString(MA1[1],_Digits)+
           // "\n MA2 [2]: "+DoubleToString(MA2[2],_Digits)+" [1]: "+DoubleToString(MA2[1],_Digits)+
            "\n MA cross signal = "+marketOrder.PositionTypeToString(signal)+
            "\n MA validation = "+marketOrder.PositionTypeToString(validation)+
            "\n Trade manager: "+tradeManager.ToString()+
            "\n");
         }
         else
         {
            Comment("EA trading schedule not used. Trading is enabled."+
           // "\n MA1 [2]: "+DoubleToString(MA1[2],_Digits)+" [1]: "+DoubleToString(MA1[1],_Digits)+
           // "\n MA2 [2]: "+DoubleToString(MA2[2],_Digits)+" [1]: "+DoubleToString(MA2[1],_Digits)+
            "\n MA cross signal = "+marketOrder.PositionTypeToString(signal)+
            "\n MA validation = "+marketOrder.PositionTypeToString(validation)+
            "\n Trade manager: "+tradeManager.ToString()+
            "\n");
         }

         if(!timeControl.IsScheduleEnabled() || timeControl.IsTradingTimeValid())
         {
            if(signal == POSITION_TYPE_BUY)
            {
               if(marketOrder.IsOpen(currentTicket,_Symbol,POSITION_TYPE_SELL,MagicNumber))
               {
                  if(currentTicket > 0 && ForceSR)
                  {
                     if(IsTradeDirectionValid(POSITION_TYPE_SELL))
                     {
                        PrintFormat("Reversing %s position on Stop&Reverse condition (ticket:%d)", _Symbol, currentTicket);
                        marketOrder.Reverse(currentTicket,Lots,StopLoss,TakeProfit);
                        tradeManagerState.Clear();
                     }
                  }  
                  return;
               }
               else if(!marketOrder.IsOpen(_Symbol,POSITION_TYPE_BUY,MagicNumber))
               {
                  if(IsTradeDirectionValid(POSITION_TYPE_BUY))
                  {
                     marketOrder.Long(_Symbol,Lots,StopLoss,TakeProfit);
                     tradeManagerState.Clear();
                  }               
                  return;
               }
            }
            else if(signal == POSITION_TYPE_SELL)
            {
               if(marketOrder.IsOpen(currentTicket,_Symbol,POSITION_TYPE_BUY,MagicNumber))
               {
                  if(currentTicket > 0 && ForceSR)
                  {
                     if(IsTradeDirectionValid(POSITION_TYPE_SELL))
                     {
                        PrintFormat("Reversing %s position on Stop&Reverse condition (ticket:%d)", _Symbol, currentTicket);
                        marketOrder.Reverse(currentTicket,Lots,StopLoss,TakeProfit);
                        tradeManagerState.Clear();
                     }
                  }   
                  return;
               }
               else if(!marketOrder.IsOpen(_Symbol,POSITION_TYPE_SELL,MagicNumber))
               {
                  if(IsTradeDirectionValid(POSITION_TYPE_SELL))
                  {
                     tradeManagerState.Clear();
                     marketOrder.Short(_Symbol,Lots,StopLoss,TakeProfit);
                  }   
                  return;
               }
            }
         }
         
         //
         //  Handling of crosses inside price gap
         //  Condition: No valid cross signal, but MA validation changed
         //
         
         if(marketOrder.IsOpen(currentTicket,currentPositionType,_Symbol,MagicNumber))
         {
            if(currentTicket > 0)
            {
               if((currentPositionType != validation) && (validation != POSITION_TYPE_NONE) && signal == POSITION_TYPE_NONE)
               {
                  if(ReverseOnMACrossInsideGap)
                  {
                     // reverse position on signal change inside gap.
                     PrintFormat("Reversing %s position on signal change inside gap (ticket:%d)", _Symbol, currentTicket);
                     marketOrder.Reverse(currentTicket,Lots,StopLoss,TakeProfit);
                     tradeManagerState.Clear();
                  }
                  else
                  {
                     // close position on signal change inside gap.
                     PrintFormat("Closing %s position on signal change inside gap (ticket:%d)", _Symbol, currentTicket);
                     marketOrder.Close(currentTicket);
                     tradeManagerState.Clear();
                  }
               }
            }
         }
      }      
   }
}

//
// Trade direction validation (Is it OK to trade in the given direction?)
//

bool IsTradeDirectionValid(ENUM_POSITION_TYPE signalDirection)
{
   if(ValidTradeDirection == TRADE_DIRECTION_ALL)
      return true;
      
   if(signalDirection == POSITION_TYPE_BUY && ValidTradeDirection == TRADE_DIRECTION_BUY)
      return true;
   else if(signalDirection == POSITION_TYPE_SELL && ValidTradeDirection == TRADE_DIRECTION_SELL)
      return true;
   else      
      return false;
}

//
// MA cross logic
//

ENUM_POSITION_TYPE MovingAverageCross()
{
   if(2 < numberOfBars-1)
   {
      Alert("Invalid number of MA readings defined! MA Cross cannot be determined.");
      return POSITION_TYPE_NONE;
   }
   
   if((MA2[1] > MA1[1]) && (MA2[2] < MA1[2]))
      return POSITION_TYPE_SELL;
   else if((MA2[1] < MA1[1]) && (MA2[2] > MA1[2]))
      return POSITION_TYPE_BUY;
   else
      return POSITION_TYPE_NONE;
}

ENUM_POSITION_TYPE MovingAverageValidation()
{ 
   if(MA2[1] > MA1[1])
      return POSITION_TYPE_SELL;
   else if(MA2[1] < MA1[1])
      return POSITION_TYPE_BUY;
      
   return POSITION_TYPE_NONE;
}
