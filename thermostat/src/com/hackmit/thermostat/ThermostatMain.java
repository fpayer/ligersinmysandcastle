package com.hackmit.thermostat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.app.Activity;
import android.view.Menu;
import android.widget.SeekBar;
import android.widget.TextView;

public class ThermostatMain extends Activity implements SeekBar.OnSeekBarChangeListener {
	private TextView desiredTemp;
	private TextView currentTemp;
    // Need handler for callbacks to the UI thread
    final Handler mHandler = new Handler();
    private String setTemp;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_thermostat_main);
		
		SeekBar bar = (SeekBar) findViewById(R.id.seekBar1);
		desiredTemp = (TextView) findViewById(R.id.desired_temp_text);
		currentTemp = (TextView) findViewById(R.id.current_temp);
		bar.setOnSeekBarChangeListener(this);
		
		setTemp = "0";
		mHandler.post(mUpdateResults);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.thermostat_main, menu);
		return true;
	}
	
	@Override
    public void onProgressChanged(SeekBar bar, int progress, boolean user) {
        progress += 43;
        desiredTemp.setText(progress + " °F");
        System.out.println("progress");
    }

    @Override
    public void onStartTrackingTouch(SeekBar arg0) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onStopTrackingTouch(SeekBar arg0) {
        // TODO Auto-generated method stub
        
    }
    

    
    // Create runnable for posting
    final Runnable mUpdateResults = new Runnable() {
        public void run() {
        	startCheckingTemperature();
            
        	updateResultsInUi();
            mHandler.postDelayed(mUpdateResults, 1000);
        }
    };
    
    private void updateResultsInUi(){
    	currentTemp.setText(setTemp +" °F");
    }
    
   
    
    protected void startCheckingTemperature() {

        // Fire off a thread to do some work that we shouldn't do directly in the UI thread
        Thread t = new Thread() {
            public void run() {
            	HttpClient client = new DefaultHttpClient();
    			HttpGet get = new HttpGet("http://162.243.27.156/getInsideTemp");
    			try {
    		        // Execute HTTP Post Request
    		        HttpResponse response = client.execute(get);
    		        String resp = getStringFromInputStream(response.getEntity().getContent());
    		        setTemp = resp;
    		    } catch (ClientProtocolException e) {
    		        System.out.println("CLIENT PROTOCOL EXCEPTION: " + e);
    		    } catch (IOException e) {
    		        System.out.println("IO EXCEPTION: " + e);
    		    }
    			
            }
        };
        t.start();
    }

    
    private static String getStringFromInputStream(InputStream is) {
    	 
		BufferedReader br = null;
		StringBuilder sb = new StringBuilder();
 
		String line;
		try {
 
			br = new BufferedReader(new InputStreamReader(is));
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
 
		return sb.toString();
 
	}

}
