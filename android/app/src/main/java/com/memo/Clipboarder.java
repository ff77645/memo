package com.memo;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import android.content.ClipData;
import android.content.Context;
import android.content.ClipboardManager;

public class Clipboarder extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public Clipboarder(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }
  
  @Override
  public String getName() {
    return "Clipboarder";
  }

  @ReactMethod
  public void setString(String text) {
    ClipboardManager clipboard = (ClipboardManager) reactContext.getSystemService(Context.CLIPBOARD_SERVICE);
    ClipData clip = ClipData.newPlainText("none", text);
    clipboard.setPrimaryClip(clip);
  }
}

