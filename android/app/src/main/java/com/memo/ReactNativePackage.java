package com.memo;

import android.widget.Toast;

import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class ReactNativePackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new ToastModule(reactContext));
    modules.add(new Clipboarder(reactContext));
    modules.add(new ExitApp(reactContext));

    return modules;
  }
}