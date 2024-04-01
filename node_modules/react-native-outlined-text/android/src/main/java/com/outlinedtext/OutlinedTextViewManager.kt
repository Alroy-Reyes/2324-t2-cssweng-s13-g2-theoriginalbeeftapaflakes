package com.outlinedtext

import android.graphics.Color
import android.os.Build
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.res.ResourcesCompat
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class OutlinedTextViewManager : SimpleViewManager<OutlinedTextView>() {
  override fun getName() = "OutlinedTextView"

  override fun createViewInstance(reactContext: ThemedReactContext): OutlinedTextView {
    val text = OutlinedTextView(reactContext)

    text.gravity = Gravity.CENTER_HORIZONTAL
    text.typeface = ResourcesCompat.getFont(reactContext, R.font.lilitaone_regular)
    text.setShadowLayer(0.1F, 2F, 2F, Color.BLACK)

    return text
  }

  @ReactProp(name = "text")
  fun setText(outlinedText: OutlinedTextView, text: String) {
    outlinedText.text = text
  }

  @ReactProp(name = "textSize")
  fun setTextSize(outlinedText: OutlinedTextView, textSize: Float) {
    outlinedText.textSize = textSize
  }

  @ReactProp(name = "isLeftAlign")
  fun setIsLeftAlign(outlinedText: OutlinedTextView, isLeftAlign: Boolean) {
    if (isLeftAlign) {
      outlinedText.gravity = Gravity.START
    } else {
      outlinedText.gravity = Gravity.CENTER_HORIZONTAL
    }
  }

  @ReactProp(name = "shadowWidth")
  fun setShadowWidth(outlinedText: OutlinedTextView, shadowWidth: Float) {
    outlinedText.setShadowLayer(0.1F, shadowWidth, shadowWidth, Color.BLACK)
  }

  @ReactProp(name = "outlineColor")
  fun setOutlineColor(outlinedText: OutlinedTextView, color: String?) {
    outlinedText.setOutlineColor(Color.parseColor(color))
  }

  @ReactProp(name = "outlineWidth", defaultFloat = 2f)
  fun setOutlineWidth(outlinedText: OutlinedTextView, width: Float) {
    outlinedText.setOutlineWidth(width)
  }
}
