package com.pizzadelivery;

import android.app.Application;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.google.firebase.FirebaseApp;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private String ipAddress = "192.168.0.3:8085";

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FirebaseApp.initializeApp(this);
    SharedPreferences preferences =
            PreferenceManager.getDefaultSharedPreferences(this.getApplicationContext());
    preferences.edit().putString("debug_http_host", ipAddress).apply();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
