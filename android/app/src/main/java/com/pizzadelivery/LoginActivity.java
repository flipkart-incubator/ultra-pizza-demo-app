package com.pizzadelivery;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;

import com.firebase.ui.auth.AuthUI;
import com.firebase.ui.auth.IdpResponse;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GetTokenResult;
//import com.google.firebase.firestore.CollectionReference;
//import com.google.firebase.firestore.FirebaseFirestore;

import java.util.Arrays;
import java.util.List;

public class LoginActivity extends AppCompatActivity {

    private static final int RC_SIGN_IN = 1;

    //private FirebaseFirestore mFirestore;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        //initFirestore();

        if(FirebaseAuth.getInstance().getCurrentUser() == null){
            List<AuthUI.IdpConfig> providers = Arrays.asList(
                    new AuthUI.IdpConfig.PhoneBuilder().build());

            startActivityForResult(
                    AuthUI.getInstance()
                            .createSignInIntentBuilder()
                            .setAvailableProviders(providers)
                            .build(),
                    RC_SIGN_IN);
        }else{
            final FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
            user.getIdToken(true).addOnSuccessListener(new OnSuccessListener<GetTokenResult>() {
                @Override
                public void onSuccess(GetTokenResult result) {
                String idToken = result.getToken();
                //Do whatever
                Log.d("Manbendra", "GetTokenResult result = " + idToken);
                launchLoggedInActivity(idToken, user.getPhoneNumber());
                }
            });
        }

    }

    /*@Override
    protected void onResume() {
        super.onResume();
        CollectionReference orders = mFirestore.collection("orders");
        Order order = new Order(2,3,4);
        orders.add(order);
    }*/

    /*private void initFirestore() {
        mFirestore = FirebaseFirestore.getInstance();
    }*/

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            IdpResponse response = IdpResponse.fromResultIntent(data);

            if (resultCode == RESULT_OK) {
                // Successfully signed in
                final FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                user.getIdToken(true).addOnSuccessListener(new OnSuccessListener<GetTokenResult>() {
                    @Override
                    public void onSuccess(GetTokenResult result) {
                        String idToken = result.getToken();
                        //Do whatever
                        Log.d("Manbendra", "GetTokenResult result = " + idToken);
                        launchLoggedInActivity(idToken, user.getPhoneNumber());
                    }
                });
            } else {
                Toast.makeText(this, "Invalid Credentials", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void launchLoggedInActivity(String authToken, String phoneNumber){
        Intent intent = new Intent(this, MainActivity.class);
        MainActivity.mAuthToken = authToken;
        MainActivity.mPhoneNumber = phoneNumber;
        //intent.putExtra(MainActivity.AUTH_TOKEN, authToken);
        this.startActivity(intent);
    }
}
