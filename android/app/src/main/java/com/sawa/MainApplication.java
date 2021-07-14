package com.sawa;

import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import iyegoroff.RNTextGradient.RNTextGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.henninghall.date_picker.DatePickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.wheelpicker.WheelPickerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNTextGradientPackage(),
            new RNGestureHandlerPackage(),
            new RNDeviceInfo(),
                    new RNFirebasePackage(),
                    new ImagePickerPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new RNFirebaseMessagingPackage(),
                    new RNFirebaseNotificationsPackage(),
                    new WheelPickerPackage(),
                    new MapsPackage(),
                    new DatePickerPackage(),
                    new LinearGradientPackage(),
                    new VectorIconsPackage(),
                    new SplashScreenReactPackage()
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
        SoLoader.init(this, /* native exopackage */ false);
    }
}
