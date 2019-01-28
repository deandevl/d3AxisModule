/**
 * Created by Rick on 2019-01-15.
 */

'use strict';
import {axisBottom,axisLeft} from 'd3-axis';
import {format} from 'd3-format';
import {timeFormat} from 'd3-time-format';
import {transition_fun} from 'd3utilmodule';

function axis_bottom(data_type,axis_class,scale,parent_g,chart_height,tick_format=null,tick_values=null,){
  const axis = axisBottom(scale);
  if(tick_format !== null) {
    switch(data_type){
      case 'linear':
      case 'band':
        axis.tickFormat(d => {
          return format(tick_format)(d);
        });
        break;
      case 'time':
        axis.tickFormat(d => {
          return timeFormat(tick_format)(d);
        });
        break;
    }
  }
  if(tick_values !== null) {
    axis.tickValues(tick_values);
  }
  parent_g.append('g')
    .attr('class',axis_class)
    .attr('transform',`translate(0,${chart_height})`)
    .call(axis);
  return axis;
}

function axis_left(data_type,axis_class,scale,parent_g,tick_format=null,tick_values=null){
  const axis = axisLeft(scale);
  if(tick_format !== null) {
    switch(data_type){
      case 'linear':
      case 'band':
        axis.tickFormat(d => {
          return format(tick_format)(d);
        });
        break;
      case 'time':
        axis.tickFormat(d => {
          return timeFormat(tick_format)(d);
        });
        break;
    }
  }
  if(tick_values !== null) {
    axis.tickValues(tick_values);
  }
  parent_g.append('g')
    .attr('class',axis_class)
    .call(axis);
  return axis;
}

function define_axis(axis_type,data_type,axis_class,scale,parent_g,chart_height=null,tick_format=null,tick_values=null){
  let axis = null;
  switch(axis_type) {
    case 'bottom':
      axis = axis_bottom(data_type,axis_class,scale,parent_g,chart_height,tick_format,tick_values);
      break;
    case 'left':
      axis = axis_left(data_type,axis_class,scale,parent_g,tick_format,tick_values);
      break;
  }
  return axis;
}

function update_axis(axis,group,scale,data_type,tick_format=null,tick_values=null,ticks=null){
  axis.scale(scale);
  if(tick_format !== null) {
    switch(data_type){
      case 'linear':
      case 'band':
        axis.tickFormat(d => {
          return format(tick_format)(d);
        });
        break;
      case 'time':
        axis.tickFormat(d => {
          return timeFormat(tick_format)(d);
        });
        break;
    }
  }
  if(tick_values !== null){
    axis.tickValues(tick_values);
  }
  if(ticks !== null){
    axis.ticks(ticks);
  }
  group.transition(transition_fun(500,1000)).call(axis);
}

export {axis_bottom,axis_left,define_axis,update_axis}