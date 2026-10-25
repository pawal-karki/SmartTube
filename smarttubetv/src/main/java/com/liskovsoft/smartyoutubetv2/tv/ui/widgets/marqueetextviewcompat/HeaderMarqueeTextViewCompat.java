package com.liskovsoft.smartyoutubetv2.tv.ui.widgets.marqueetextviewcompat;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.LayerDrawable;
import android.util.AttributeSet;
import android.view.View;

import com.liskovsoft.smartyoutubetv2.tv.util.ViewUtil;

/**
 * MarqueeTextView used in browse section headers
 */
public class HeaderMarqueeTextViewCompat extends MarqueeTextViewCompat {
    public HeaderMarqueeTextViewCompat(Context context) {
        super(context);

        init();
    }

    public HeaderMarqueeTextViewCompat(Context context, AttributeSet attrs) {
        super(context, attrs);

        init();
    }

    public HeaderMarqueeTextViewCompat(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);

        init();
    }

    private void init() {
        ViewUtil.applyMarqueeRtlParams(this, true);
    }

    /**
     * Sidebar rail (collapsed) squeezes the label: fade it out as soon as it gets narrower than its text
     * (fully gone at half width) so a squashed or ellipsized label is never visible during the animation.
     */
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        float full = Math.min(getPaint().measureText(getText().toString()), getMaxWidth());
        setAlpha(full <= 0 || w >= full ? 1f : Math.max(0f, (w / full - 0.5f) * 2f));
        updateParentDivider();
    }

    /**
     * The row below Library draws a divider line as the 2nd layer of its background.
     * Like YouTube TV, show it only in the expanded sidebar (the collapsed rail shows just the gap).
     */
    public void updateParentDivider() {
        if (!(getParent() instanceof View)) {
            return;
        }
        Drawable bg = ((View) getParent()).getBackground();
        if (bg instanceof LayerDrawable && ((LayerDrawable) bg).getNumberOfLayers() > 1) {
            boolean collapsed = getWidth() > 0 && getAlpha() == 0f;
            ((LayerDrawable) bg.mutate()).getDrawable(1).setAlpha(collapsed ? 0 : 255);
            bg.invalidateSelf();
        }
    }
}
