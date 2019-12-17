 import { WebView, ProgressEventData, LoadEventData } from "../../NativeScriptCoreUIForks/WebView";
 import { View, Property, EventData } from "@nativescript/core/ui/core/view";
 
 /**
  * Represents a standard WebView widget.
  */
 export class BarAwareWebView extends WebView {
     /**
      * String value used when hooking to barRetractionRecommendation event.
      */
     public static barRetractionRecommendationEvent: string;

     /**
      * Gets or sets the retraction state of the bars to be associated with the BarAwareWebView.
      * Set this to inform the BarAwareWebView about whether to prevent scrolling upon first tap of the
      * status bar, which should simply reveal the status bar if currently retracted (on iOS).
      * 
      * @available ios (no effect on Android)
      */
     barRetractionState: RetractionState;

     /**
      * A basic method signature to hook an event listener (shortcut alias to the addEventListener method).
      * @param eventNames - String corresponding to events (e.g. "propertyChange"). Optionally could be used more events separated by `,` (e.g. "propertyChange", "change").
      * @param callback - Callback function which will be executed when event is raised.
      * @param thisArg - An optional parameter which will be used as `this` context for callback execution.
      */
     on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    
    /**
      * Raised when a loadStarted event occurs.
      */
     on(event: "barRetractionRecommendation", callback: (args: BarRetractionRecommendationEventData) => void, thisArg?: any);

     /**
      * Raised when a progress event occurs.
      */
     on(event: "progress", callback: (args: ProgressEventData) => void, thisArg?: any);
 
     /**
      * Raised when a loadFinished event occurs.
      */
     on(event: "loadFinished", callback: (args: LoadEventData) => void, thisArg?: any);

     /**
      * Raised when a loadCommitted event occurs.
      */
     on(event: "loadCommitted", callback: (args: LoadEventData) => void, thisArg?: any);
 
     /**
      * Raised when a loadStarted event occurs.
      */
     on(event: "loadStarted", callback: (args: LoadEventData) => void, thisArg?: any);
}

export interface BarRetractionRecommendationEventData extends EventData {
    barsShouldRetract: boolean;
}

export enum RetractionState {
    revealed = "revealed",
    retracting = "retracting",
    retracted = "retracted",
    revealing = "revealing",
}