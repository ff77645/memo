package com.memo;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ExitApp extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;
  public ExitApp(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }
  
  @Override
  public String getName() {
    return "ExitApp";
  }

  @ReactMethod
  public void exitApp() {
    android.os.Process.killProcess(android.os.Process.myPid());
  }
}

