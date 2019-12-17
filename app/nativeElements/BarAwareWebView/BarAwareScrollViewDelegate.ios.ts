/// <reference path="../../../node_modules/tns-platform-declarations/ios.d.ts" />
import { WebView } from "~/NativeScriptCoreUIForks/WebView/web-view";

class BarAwareUIScrollViewDelegateImpl extends NSObject implements UIScrollViewDelegate {
    public static ObjCProtocols = [UIScrollViewDelegate];
    public static initWithOwner(owner: WeakRef<WebView>): BarAwareUIScrollViewDelegateImpl {
        const handler = <BarAwareUIScrollViewDelegateImpl>BarAwareUIScrollViewDelegateImpl.new();
        handler._owner = owner;

        // const uiScrollView = <UIScrollView>owner.get().ios.scrollView;

        return handler;
    }
    private _owner: WeakRef<WebView>;

    // public scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean {
    //     return true;
    // }

    public scrollViewWillBeginDecelerating(scrollView: UIScrollView): void {
        const translation: CGPoint = scrollView.panGestureRecognizer.translationInView(scrollView);

        // setNavigationBarHidden(translation.y <= 0, animated: true)
    }

    public scrollViewDidScroll(scrollView: UIScrollView): void {
        const translation: CGPoint = scrollView.panGestureRecognizer.translationInView(scrollView);

        if(translation.y < 0){
            if(scrollView.dragging){
                // setNavigationBarHidden(true, animated: true)
            }
        }
    }
}