package com.pizzadelivery;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {

    public static String mAuthToken;
    public static String mPhoneNumber;

    public static final String AUTH_TOKEN = "AuthToken";
    public static final String MOBILE_NUMBER = "MobileNumber";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mAuthToken = getIntent().getStringExtra(AUTH_TOKEN);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */


    @Override
    protected String getMainComponentName() {
        return "PizzaDelivery";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                Bundle bundle = new Bundle();
                bundle.putString(AUTH_TOKEN, mAuthToken);
                bundle.putString(MOBILE_NUMBER,mPhoneNumber);
                return bundle;
            }
        };
    }
}
