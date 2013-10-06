package com.hackmit.thermostat;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.widget.SeekBar;
import android.widget.TextView;

public class ThermostatMain extends Activity implements SeekBar.OnSeekBarChangeListener {
	private TextView desiredTemp;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_thermostat_main);
		
		SeekBar bar = (SeekBar) findViewById(R.id.seekBar1);
		desiredTemp = (TextView) findViewById(R.id.desired_temp_text);
		
		bar.setOnSeekBarChangeListener(this);
		
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

}
