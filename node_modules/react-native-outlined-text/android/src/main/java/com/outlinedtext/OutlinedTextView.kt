package com.outlinedtext

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint

import com.facebook.react.views.text.ReactTextView

class OutlinedTextView (
  context: Context,
) : ReactTextView(context) {

  private var isDrawing = false

  private var outlineColor = Color.BLACK
  private var outlineWidth = 0f

  override fun onDraw(canvas: Canvas?) {
    if (this.outlineWidth > 0) {
      this.isDrawing = true;

      setTextColor(this.outlineColor)
      paint.strokeWidth = this.outlineWidth
      paint.style = Paint.Style.FILL_AND_STROKE

      super.onDraw(canvas)

      setTextColor(Color.WHITE)
      paint.strokeWidth = 0F
      paint.style = Paint.Style.FILL

      this.isDrawing = false
    }

    super.onDraw(canvas)
  }

  override fun invalidate() {
    if (this.isDrawing) {
      return
    }
    super.invalidate()
  }

  fun setOutlineColor(outlineColor: Int) {
    this.outlineColor = outlineColor
    this.invalidate()
  }

  fun setOutlineWidth(outlineWidth: Float) {
    this.outlineWidth = outlineWidth
    this.invalidate()
  }
}
