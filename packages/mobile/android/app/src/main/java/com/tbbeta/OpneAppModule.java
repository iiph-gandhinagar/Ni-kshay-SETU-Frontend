package com.tbbeta;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import org.json.JSONException;
import org.json.JSONObject;

import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.google.gson.Gson;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class OpneAppModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private ReactApplicationContext reactContext;
    private Callback successHandler;
    String TAG ="PK";
    private Callback failureHandler;
    private final Gson gson = new Gson();
    private String FAILURE = "FAILURE";

    OpneAppModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "OpneAppModule";
    }


    @ReactMethod
    public void openApp( String packageName,Callback successHandler, Callback failureHandler) {
        this.successHandler = successHandler;
        this.failureHandler = failureHandler;

        Context currentContext = getCurrentActivity().getApplicationContext();
        Intent intent = currentContext.getPackageManager().getLaunchIntentForPackage(packageName);
        if(intent !=null){
            if (isCallable(intent, currentContext)) {
                currentContext.startActivity(intent);
            } else {
                final JSONObject responseData = new JSONObject();

                try {
                    responseData.put("message", "app not installed");
                    responseData.put("status", FAILURE);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                this.failureHandler.invoke(gson.toJson(responseData));
            }
        }
    }

    private boolean isCallable(Intent intent, Context context) {
        List < ResolveInfo > list = context.getPackageManager().queryIntentActivities(intent,
                PackageManager.MATCH_DEFAULT_ONLY);
        return list.size() > 0;
    } {}



    @ReactMethod
    public void isAppAvailable(String packageName, final Promise promise) {
        Context currentContext = getCurrentActivity().getApplicationContext();
        Intent sendIntent = currentContext.getPackageManager().getLaunchIntentForPackage(packageName);
        if (sendIntent == null) {
            promise.resolve(false);
            return;
        }
        promise.resolve(true);
    }




    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

        final JSONObject responseData = new JSONObject();

        try {
            if (data == null) {
                responseData.put("status", FAILURE);
                responseData.put("message", "No action taken");
                if (this.failureHandler != null) {
                    this.failureHandler.invoke(gson.toJson(responseData));
                }
                return;
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        Log.d(TAG, "On New Intent");
    }

}