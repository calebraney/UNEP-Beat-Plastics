// Global config
// Y axis
Chart.defaults.scales.category.grid = {
  ...Chart.defaults.scales.category.grid,
  display: false
};
Chart.defaults.scales.category.title = {
  ...Chart.defaults.scales.category.title,
  font: {
    size: 15
  }
};
// X axis
Chart.defaults.scales.linear.grid = {
  ...Chart.defaults.scales.linear.grid,
  display: false
};
Chart.defaults.scales.linear.title = {
  ...Chart.defaults.scales.linear.title,
  font: {
    size: 15
  }
};

// CHART 1
const ctx = document.getElementById('myChart1');
const ctx2 = document.getElementById('myChart2');
const ctx3 = document.getElementById('myChart3');

const colors = {
"WMaU": ["#E785F7", "#E166F5", "#B452C4", "#B452C4"],
"WuC": ["#85D8F7", "#66CEF5", "#52A5C4", "#52A5C4"],
"CWM": ["rgba(173, 229, 127, 0.8)", "rgba(152, 223, 95, 0.8)", "rgba(122, 178, 76, 0.8)", "rgba(122, 178, 76, 0.8)"]
};

new Chart(ctx, {
type: 'bar',
data: {
  labels: ["2020", "2030", "2040", "2050"],
  datasets: [
    {
      label: "Total amount",
      borderWidth: 1,
      data: [2.126, 2.684, 3.229, 3.782],
      yAxisID: 'y',
      backgroundColor: colors["WMaU"]
    }, {
      type: 'scatter',
      label:"Per capita rate",
      data: [0.76,0.88, 0.99, 1.1],
      yAxisId: 'y1'
    }
  ]
},
options: {
  responsive: true,
  aspectRatio: 1.5, 
  scales: {
    y1: {
      position: 'right',
      grid: {
        drawOnChartArea: false
      },
      title: {
        text: 'Per capita (kg/year)',
        display: true,
        
      }
    },
    y: {
      position: 'left',
      min: 0,
      max: 5,
      title: {
        text: 'Total (billion tonnes)',
        display: true
      }
    }
  }
}
});

new Chart(ctx2,{
type: 'bar',
data: {
  labels: ["2020", "2030", "2040", "2050"],
  datasets: [
    {
      label: "Total amount",
      borderWidth: 1,
      data: [2.126, 2.684, 2.923, 3.146],
      yAxisID: 'y',
      backgroundColor: colors["WuC"]
    }, {
      type: 'scatter',
      label: 'Per capita rate',
      data: [0.76,0.88, 0.9, 0.92],
      yAxisId: 'y1'
    }
  ]
},
options: {
  responsive: true,
  aspectRatio: 1.5, 
  scales: {
    y1: {
      position: 'right',
      grid: {
        drawOnChartArea: false
      },
      title: {
        text: 'Per capita (kg/year)',
        display: true,
        
      }
    },
    y: {
      position: 'left',
      min: 0,
      max: 5,
      title: {
        text: 'Total (billion tonnes)',
        display: true
      }
    }
  }
}
});

new Chart(ctx3,{
type: 'bar',
data: {
  labels: ["2020", "2030", "2040", "2050"],
  datasets: [
    {
      label: "Total amount",
      borderWidth: 1,
      data: [2.126, 2.684, 2.684, 2.126],
      backgroundColor: colors["CWM"],
      yAxisID: 'y'
    }, {
      type: 'scatter',
      label:'Per capita rate',
      data: [0.76,0.88, 0.82, 0.62],
      yAxisId: 'y1'
    }
  ]
},
options: {
  responsive: true,
  aspectRatio: 1.5, 
  scales: {
    y1: {
      position: 'right',
      grid: {
        drawOnChartArea: false
      },
      title: {
        text: 'Per capita (kg/year)',
        display: true,
        
      }
    },
    y: {
      position: 'left',
      min: 0,
      max: 5,
      title: {
        text: 'Total (billion tonnes)',
        display: true
      }
    }
  }
}
});

// Chart 2

const ctx4 = document.getElementById('myChart4');
const ctx5 = document.getElementById('myChart5');
const chart2_xAxisLabels = [
"North America",
"Central America and the Caribbean",
"South America",
"North Europe",
"West Europe",
"South Europe",
"East Europe",
"West Asia and North Africa",
"Sub-Saharan Africa",
"Central and South Asia",
"East and South East Asia",
"Oceania",
"Australia and New Zealand",
]
const chart2_labels = {
"Food and green": [28,54,52,26,31,40,34,56,61,54,55,39,44],
"Glass": [5,5,3,5,9,7,12,3,2,3,2,2,4],
"Paper": [29,14,12,22,22,19,18,13,6,6,13,15,15],
"Plastic": [12,11,13,14,12,11,12,10,6,5,12,11,8],
"Metal": [9,3,3,4,2,3,3,2,2,2,2,4,16],
"Other": [17,13,17,29,24,20,21,16,23,30,16,29,13],
}

const chart2_colors = ["rgba(225, 102, 245, 0.75)", "rgba(133, 216, 247, 0.75)", "rgba(82, 165, 196, 0.75)", "rgba(152, 223, 95, 0.75)", "rgba(17, 17, 17, 0.75)", "rgba(153, 153, 153, 0.75)"]

new Chart(ctx4, {
type: "pie",
data: {
  labels: ['Food and green', 'Glass', 'Paper', 'Plastic', 'Metal', 'Other'] ,
  datasets: [{
    data: [46.69,	4.13,	15.60,	10.60,	3.60,	19.38],
    backgroundColor: chart2_colors
  }],
  options: {
    plugins: {
      labels: [{
        render: 'label',
        position: 'outside'}],
      }
  }
}
})

new Chart(ctx5, {
type: "bar",
data: {
  labels: chart2_xAxisLabels,
  datasets: Object.entries(chart2_labels).map(([key, value], index) => ({
    label: key,
    data: value,
    backgroundColor: chart2_colors[index]
  }))
},
options: {
  scales: {
    x: {
      stacked: true,
      title: {
        text: 'Region',
        display: true
      }
    },
    y: {
      stacked: true,
      title: {
        text: 'Waste composition (per cent)',
        display: true
      }
    }
  }
} 
});

// Chart 3
const ctx6 = document.getElementById('myChart6');
const chart3_data = [
{ "tooltip": "Burundi", "urbanization_rate":	11.194, "waste":	201 },
{ "tooltip": "Papua New Guinea", "urbanization_rate":	12.988, "waste":	118.1453124 },
{ "tooltip": "Liechtenstein", "urbanization_rate":	14.371, "waste":	857.3005232 },
{ "tooltip": "Malawi", "urbanization_rate":	15.966, "waste":	80.98986719 },
{ "tooltip": "Niger", "urbanization_rate":	16.212, "waste":	178.85 },
{ "tooltip": "Rwanda", "urbanization_rate":	17.056, "waste":	367.5304462 },
{ "tooltip": "Sri Lanka", "urbanization_rate":	18.311, "waste":	122.8279731 },
{ "tooltip": "South Sudan", "urbanization_rate":	18.415, "waste":	241.3716475 },
{ "tooltip": "Samoa", "urbanization_rate":	18.452, "waste":	75.2388374 },
{ "tooltip": "St. Lucia", "urbanization_rate":	18.754, "waste":	442.3688572 },
{ "tooltip": "Nepal", "urbanization_rate":	18.942, "waste":	63.49254084 },
{ "tooltip": "Ethiopia", "urbanization_rate":	19.428, "waste":	63.75198689 },
{ "tooltip": "Uganda", "urbanization_rate":	19.898, "waste":	211.5901391 },
{ "tooltip": "Solomon Islands", "urbanization_rate":	21.433, "waste":	309.0363679 },
{ "tooltip": "Cambodia", "urbanization_rate":	21.799, "waste":	71.5937875 },
{ "tooltip": "Chad", "urbanization_rate":	21.985, "waste":	114.2397409 },
{ "tooltip": "Micronesia, Fed. Sts.", "urbanization_rate":	22.526, "waste":	236.8827211 },
{ "tooltip": "Tonga", "urbanization_rate":	23.435, "waste":	160.3523818 },
{ "tooltip": "Eswatini", "urbanization_rate":	23.459, "waste":	190.980207 },
{ "tooltip": "Kenya", "urbanization_rate":	23.571, "waste":	134.7635487 },
{ "tooltip": "Antigua and Barbuda", "urbanization_rate":	24.506, "waste":	1447.324949 },
{ "tooltip": "Vanuatu", "urbanization_rate":	25.062, "waste":	247.9555996 },
{ "tooltip": "Burkina Faso", "urbanization_rate":	25.767, "waste":	186.15 },
{ "tooltip": "Tajikistan", "urbanization_rate":	26.589, "waste":	219.6737684 },
{ "tooltip": "Guyana", "urbanization_rate":	26.634, "waste":	239.6628303 },
{ "tooltip": "Comoros", "urbanization_rate":	28.47, "waste":	124.6384631 },
{ "tooltip": "Myanmar", "urbanization_rate":	28.885, "waste":	113.15 },
{ "tooltip": "Tanzania", "urbanization_rate":	29.493, "waste":	194.1356927 },
{ "tooltip": "Timor-Leste", "urbanization_rate":	29.85, "waste":	52.16150754 },
{ "tooltip": "Vietnam", "urbanization_rate":	30.417, "waste":	109.4862052 },
{ "tooltip": "Barbados", "urbanization_rate":	31.7, "waste":	634.5687617 },
{ "tooltip": "Zimbabwe", "urbanization_rate":	32.237, "waste":	62.64335997 },
{ "tooltip": "Lao PDR", "urbanization_rate":	33.108, "waste":	51.84592258 },
{ "tooltip": "Sudan", "urbanization_rate":	33.346, "waste":	288.35 },
{ "tooltip": "Mozambique", "urbanization_rate":	33.878, "waste":	96.01091913 },
{ "tooltip": "Madagascar", "urbanization_rate":	34.534, "waste":	127.75 },
{ "tooltip": "India", "urbanization_rate":	34.926, "waste":	137.4976869 },
{ "tooltip": "Eritrea", "urbanization_rate":	35.771, "waste":	226.6380375 },
{ "tooltip": "Kyrgyz Republic", "urbanization_rate":	35.777, "waste":	188.2170036 },
{ "tooltip": "Grenada", "urbanization_rate":	35.869, "waste":	254.8127815 },
{ "tooltip": "Pakistan", "urbanization_rate":	36.442, "waste":	141.0543889 },
{ "tooltip": "Mali", "urbanization_rate":	37.599, "waste":	117.3109996 },
{ "tooltip": "Bangladesh", "urbanization_rate":	38.177, "waste":	149.3242026 },
{ "tooltip": "Maldives", "urbanization_rate":	38.529, "waste":	485.570524 },
{ "tooltip": "Togo", "urbanization_rate":	39.579, "waste":	152.1641289 },
{ "tooltip": "Sierra Leone", "urbanization_rate":	39.642, "waste":	164.25 },
{ "tooltip": "Central African Republic", "urbanization_rate":	39.959, "waste":	230.4738645 },
{ "tooltip": "Zambia", "urbanization_rate":	40.354, "waste":	76.65 },
{ "tooltip": "Mauritius", "urbanization_rate":	40.841, "waste":	383.6512506 },
{ "tooltip": "Faroe Islands", "urbanization_rate":	41.501, "waste":	1258.640256 },
{ "tooltip": "Bhutan", "urbanization_rate":	41.612, "waste":	137.8650192 },
{ "tooltip": "Guinea-Bissau", "urbanization_rate":	42.123, "waste":	161.8374001 },
{ "tooltip": "Moldova", "urbanization_rate":	42.726, "waste":	392.990364 },
{ "tooltip": "Egypt, Arab Rep.", "urbanization_rate":	42.73, "waste":	198.8284818 },
{ "tooltip": "Aruba", "urbanization_rate":	42.99, "waste":	856.6486849 },
{ "tooltip": "Nigeria", "urbanization_rate":	43.48, "waste":	283.9340767 },
{ "tooltip": "Namibia", "urbanization_rate":	43.693, "waste":	182.5 },
{ "tooltip": "Somalia", "urbanization_rate":	43.816, "waste":	162.7456846 },
{ "tooltip": "Benin", "urbanization_rate":	44.125, "waste":	197.1 },
{ "tooltip": "Congo, Dem. Rep.", "urbanization_rate":	44.46, "waste":	255.9697668 },
{ "tooltip": "Senegal", "urbanization_rate":	44.603, "waste":	189.8 },
{ "tooltip": "Côte d’Ivoire", "urbanization_rate":	47.33, "waste":	210.265409 },
{ "tooltip": "Philippines", "urbanization_rate":	47.408, "waste":	205.007572 },
{ "tooltip": "Mauritania", "urbanization_rate":	48.4, "waste":	182.5 },
{ "tooltip": "Bosnia and Herzegovina", "urbanization_rate":	48.626, "waste":	365.3987607 },
{ "tooltip": "Thailand", "urbanization_rate":	49.2, "waste":	386.7731173 },
{ "tooltip": "Turkmenistan", "urbanization_rate":	49.541, "waste":	89.92652104 },
{ "tooltip": "Guatemala", "urbanization_rate":	49.971, "waste":	172.2843908 },
{ "tooltip": "Uzbekistan", "urbanization_rate":	51.05, "waste":	135.5791982 },
{ "tooltip": "Isle of Man", "urbanization_rate":	52.012, "waste":	599.3005335 },
{ "tooltip": "Haiti", "urbanization_rate":	52.427, "waste":	218.6582345 },
{ "tooltip": "Kiribati", "urbanization_rate":	52.45, "waste":	301.43383 },
{ "tooltip": "Fiji", "urbanization_rate":	52.683, "waste":	208.497332 },
{ "tooltip": "Slovak Republic", "urbanization_rate":	53.729, "waste":	421.5313598 },
{ "tooltip": "Cameroon", "urbanization_rate":	53.976, "waste":	602.25 },
{ "tooltip": "Romania", "urbanization_rate":	54.084, "waste":	278.1162322 },
{ "tooltip": "Seychelles", "urbanization_rate":	54.12, "waste":	503.6250511 },
{ "tooltip": "Slovenia", "urbanization_rate":	54.822, "waste":	497.8934186 },
{ "tooltip": "Jamaica", "urbanization_rate":	55.378, "waste":	360.5841953 },
{ "tooltip": "Ghana", "urbanization_rate":	55.407, "waste":	181.465962 },
{ "tooltip": "Honduras", "urbanization_rate":	55.813, "waste":	228.5248766 },
{ "tooltip": "Indonesia", "urbanization_rate":	55.985, "waste":	389.4906115 },
{ "tooltip": "Azerbaijan", "urbanization_rate":	56.031, "waste":	304.4696115 },
{ "tooltip": "Serbia", "urbanization_rate":	56.26, "waste":	317.5222563 },
{ "tooltip": "Nicaragua", "urbanization_rate":	56.917, "waste":	261.0802153 },
{ "tooltip": "Gambia, The", "urbanization_rate":	57.105, "waste":	193.45 },
{ "tooltip": "Croatia", "urbanization_rate":	57.242, "waste":	438.7672674 },
{ "tooltip": "Georgia", "urbanization_rate":	57.448, "waste":	212.1378939 },
{ "tooltip": "Kazakhstan", "urbanization_rate":	57.54, "waste":	230.2038895 },
{ "tooltip": "North Macedonia", "urbanization_rate":	58.208, "waste":	433.2657262 },
{ "tooltip": "Austria", "urbanization_rate":	58.515, "waste":	587.8418097 },
{ "tooltip": "Poland", "urbanization_rate":	60.037, "waste":	331.3018182 },
{ "tooltip": "Morocco", "urbanization_rate":	60.256, "waste":	200.0665487 },
{ "tooltip": "China", "urbanization_rate":	60.308, "waste":	218.5699851 },
{ "tooltip": "Tuvalu", "urbanization_rate":	60.645, "waste":	367.626843 },
{ "tooltip": "Paraguay", "urbanization_rate":	60.75, "waste":	294.3535258 },
{ "tooltip": "Albania", "urbanization_rate":	61.229, "waste":	378.233777 },
{ "tooltip": "Angola", "urbanization_rate":	61.268, "waste":	175.2 },
{ "tooltip": "French Polynesia", "urbanization_rate":	61.583, "waste":	510.35996 },
{ "tooltip": "Armenia", "urbanization_rate":	63.219, "waste":	175.1554775 },
{ "tooltip": "Ireland", "urbanization_rate":	63.405, "waste":	630.3080115 },
{ "tooltip": "Ecuador", "urbanization_rate":	63.67, "waste":	318.5759886 },
{ "tooltip": "Congo, Rep.", "urbanization_rate":	64.169, "waste":	182.5 },
{ "tooltip": "Cabo Verde", "urbanization_rate":	64.3, "waste":	309.0307154 },
{ "tooltip": "El Salvador", "urbanization_rate":	65.452, "waste":	269.7066962 },
{ "tooltip": "Portugal", "urbanization_rate":	65.764, "waste":	513.2205557 },
{ "tooltip": "Suriname", "urbanization_rate":	66.208, "waste":	174.0365531 },
{ "tooltip": "South Africa", "urbanization_rate":	66.355, "waste":	221.4872836 },
{ "tooltip": "Cyprus", "urbanization_rate":	66.805, "waste":	464.6669981 },
{ "tooltip": "Montenegro", "urbanization_rate":	67.15, "waste":	537.7572193 },
{ "tooltip": "Tunisia", "urbanization_rate":	67.218, "waste":	295.65 },
{ "tooltip": "Lithuania", "urbanization_rate":	67.855, "waste":	462.9559757 },
{ "tooltip": "Panama", "urbanization_rate":	68.059, "waste":	301.7620994 },
{ "tooltip": "Latvia", "urbanization_rate":	68.222, "waste":	438.2861758 },
{ "tooltip": "Mongolia", "urbanization_rate":	68.297, "waste":	957.2362938 },
{ "tooltip": "Botswana", "urbanization_rate":	68.7, "waste":	204.3954477 },
{ "tooltip": "Estonia", "urbanization_rate":	69.051, "waste":	369.2431044 },
{ "tooltip": "São Tomé and Príncipe", "urbanization_rate":	69.213, "waste":	129.5538666 },
{ "tooltip": "Ukraine", "urbanization_rate":	69.473, "waste":	355.6482883 },
{ "tooltip": "Bolivia", "urbanization_rate":	69.773, "waste":	243.8207514 },
{ "tooltip": "New Caledonia", "urbanization_rate":	69.821, "waste":	381.174084 },
{ "tooltip": "Iraq", "urbanization_rate":	70.678, "waste":	434.0286763 },
{ "tooltip": "Italy", "urbanization_rate":	70.736, "waste":	502.6626403 },
{ "tooltip": "Algeria", "urbanization_rate":	70.848, "waste":	154.1772669 },
{ "tooltip": "Equatorial Guinea", "urbanization_rate":	71.138, "waste":	141.8537636 },
{ "tooltip": "Hungary", "urbanization_rate":	71.644, "waste":	386.8275596 },
{ "tooltip": "Switzerland", "urbanization_rate":	73.849, "waste":	708.8725917 },
{ "tooltip": "Czech Republic", "urbanization_rate":	73.921, "waste":	506.6020074 },
{ "tooltip": "Russian Federation", "urbanization_rate":	74.292, "waste":	401.5055468 },
{ "tooltip": "Iran, Islamic Rep.", "urbanization_rate":	74.394, "waste":	211.6440886 },
{ "tooltip": "Bulgaria", "urbanization_rate":	75.347, "waste":	436.7225842 },
{ "tooltip": "Türkiye", "urbanization_rate":	75.63, "waste":	419.4572788 },
{ "tooltip": "Malaysia", "urbanization_rate":	76.036, "waste":	371.7676126 },
{ "tooltip": "West Bank and Gaza", "urbanization_rate":	76.164, "waste":	400.0057126 },
{ "tooltip": "Brunei Darussalam", "urbanization_rate":	76.99, "waste":	507.6436663 },
{ "tooltip": "Cuba", "urbanization_rate":	77.109, "waste":	663.5523403 },
{ "tooltip": "Germany", "urbanization_rate":	77.376, "waste":	608.6967116 },
{ "tooltip": "Peru", "urbanization_rate":	78.099, "waste":	292.1004244 },
{ "tooltip": "Libya", "urbanization_rate":	78.277, "waste":	347.0508502 },
{ "tooltip": "Dominican Republic", "urbanization_rate":	78.566, "waste":	390.5415732 },
{ "tooltip": "Palau", "urbanization_rate":	78.775, "waste":	529.1168332 },
{ "tooltip": "Belarus", "urbanization_rate":	79.044, "waste":	411.8267515 },
{ "tooltip": "Greece", "urbanization_rate":	79.388, "waste":	530.8291337 },
{ "tooltip": "Mexico", "urbanization_rate":	79.867, "waste":	356.9438689 },
{ "tooltip": "Costa Rica", "urbanization_rate":	80.076, "waste":	264.3311125 },
{ "tooltip": "Oman", "urbanization_rate":	80.145, "waste":	432.7186783 },
{ "tooltip": "Spain", "urbanization_rate":	80.565, "waste":	472.3393157 },
{ "tooltip": "France", "urbanization_rate":	80.709, "waste":	580.856211 },
{ "tooltip": "Colombia", "urbanization_rate":	80.778, "waste":	245.1959396 },
{ "tooltip": "Canada", "urbanization_rate":	81.411, "waste":	961.2462763 },
{ "tooltip": "Korea, Rep.", "urbanization_rate":	81.43, "waste":	408.3850557 },
{ "tooltip": "United States", "urbanization_rate":	82.256, "waste":	880.3515582 },
{ "tooltip": "Norway", "urbanization_rate":	82.616, "waste":	776.1375201 },
{ "tooltip": "Saudi Arabia", "urbanization_rate":	83.18, "waste":	467.1777408 },
{ "tooltip": "United Kingdom", "urbanization_rate":	83.398, "waste":	463.4143089 },
{ "tooltip": "Greenland", "urbanization_rate":	84.383, "waste":	887.2957002 },
{ "tooltip": "Finland", "urbanization_rate":	85.446, "waste":	565.6033818 },
{ "tooltip": "Australia", "urbanization_rate":	86.124, "waste":	495.7860045 },
{ "tooltip": "New Zealand", "urbanization_rate":	86.538, "waste":	765.7290671 },
{ "tooltip": "United Arab Emirates", "urbanization_rate":	86.789, "waste":	609.8449094 },
{ "tooltip": "Brazil", "urbanization_rate":	86.824, "waste":	381.5496048 },
{ "tooltip": "American Samoa", "urbanization_rate":	87.198, "waste":	376.4171028 },
{ "tooltip": "Chile", "urbanization_rate":	87.564, "waste":	437.2627557 },
{ "tooltip": "Sweden", "urbanization_rate":	87.708, "waste":	449.0684678 },
{ "tooltip": "Lebanon", "urbanization_rate":	87.947, "waste":	325.1336435 },
{ "tooltip": "Andorra", "urbanization_rate":	87.984, "waste":	546.0736412 },
{ "tooltip": "Denmark", "urbanization_rate":	87.994, "waste":	846.6361783 },
{ "tooltip": "Bahrain", "urbanization_rate":	88.999, "waste":	985.5 },
{ "tooltip": "Jordan", "urbanization_rate":	89.125, "waste":	328.7924828 },
{ "tooltip": "Curaçao", "urbanization_rate":	89.544, "waste":	148.6963283 },
{ "tooltip": "Northern Mariana Islands", "urbanization_rate":	91.19, "waste":	628.3234786 },
{ "tooltip": "Luxembourg", "urbanization_rate":	91.223, "waste":	791.9699729 },
{ "tooltip": "Japan", "urbanization_rate":	91.698, "waste":	339.7442583 },
{ "tooltip": "Netherlands", "urbanization_rate":	91.876, "waste":	507.162767 },
{ "tooltip": "Argentina", "urbanization_rate":	92.111, "waste":	419.75 },
{ "tooltip": "Israel", "urbanization_rate":	92.501, "waste":	669.0661623 },
{ "tooltip": "Puerto Rico", "urbanization_rate":	93.624, "waste":	1192.608944 },
{ "tooltip": "Iceland", "urbanization_rate":	93.813, "waste":	699.8237691 },
{ "tooltip": "Guam", "urbanization_rate":	94.277, "waste":	850.4014616 },
{ "tooltip": "Uruguay", "urbanization_rate":	94.414, "waste":	375.95 },
{ "tooltip": "Malta", "urbanization_rate":	94.678, "waste":	697.6341994 },
{ "tooltip": "San Marino", "urbanization_rate":	96.91, "waste":	507.6160076 },
{ "tooltip": "Belgium", "urbanization_rate":	98.041, "waste":	415.1836816 },
{ "tooltip": "Qatar", "urbanization_rate":	98.945, "waste":	657 },
{ "tooltip": "Bermuda", "urbanization_rate":	100.0, "waste":	1353.977332 },
{ "tooltip": "Singapore", "urbanization_rate":	100.0, "waste":	1233.123182 },
{ "tooltip": "Cayman Islands", "urbanization_rate":	100.0, "waste":	1007.387508 },
{ "tooltip": "Monaco", "urbanization_rate":	100.0, "waste":	836.361177 },
{ "tooltip": "Hong Kong SAR, China", "urbanization_rate":	100.0, "waste":	775.8276903 },
{ "tooltip": "Macao SAR, China", "urbanization_rate":	100.0, "waste":	603.0774435 },
{ "tooltip": "Kuwait", "urbanization_rate":	100.0, "waste":	594.5592057 },
{ "tooltip": "Nauru", "urbanization_rate":	100.0, "waste":	541.3789018 },
{ "tooltip": "Gibraltar", "urbanization_rate":	100.0, "waste":	527.1766169 }
]
const trendLine = regression.polynomial(
chart3_data.map((el) => [el.urbanization_rate, el.waste])
, { order: 2});
const onShowTooltip = (context) => {
if (context.raw.tooltip) {
  const urbanization_rate = Math.round(10*context.raw.x)/10
  const kilograms_per_year = Math.round(context.raw.y);
  return `${context.raw.tooltip}'s urbanization rate is ${urbanization_rate} per cent. The average person produces ${kilograms_per_year}kg of waste per year`  
} else {
  return ''; 
}
}
new Chart(ctx6, {
 data: {
    datasets: [{
     type: 'scatter',
     label: 'Test',
     data: chart3_data.map(el => ({
       x: el.urbanization_rate,
       y: el.waste,
       tooltip: el.tooltip
     })),
     backgroundColor: 'rgba(102, 206, 245, 0.8)'
   }, {
     type: 'line',
     data: trendLine.points,
     pointRadius: 1,
     pointRadiusHover: 1,
     borderColor: 'rgba(225, 102, 245, 1)'
   }] 
 },
options: {
  
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
       callbacks: {
         label: onShowTooltip
       }
    }
  } ,
  scales: {
    x:  {
      title: {
        text: 'Urbanization rate (per cent)',
        display: true
      } 
    },
    y:  {
      title: {
        text: 'Waste (kg/person/year)',
        display: true
      } 
    }
  }
}
});

// Chart 5
const wmauColors = [
"rgba(180, 82, 196, 0.8)",
"rgba(225, 102, 245, 0.8)",
"rgba(231, 133, 247, 0.8)",
"rgba(238, 170, 249, 0.8)",
]
const wucColors = [
"rgba(66, 132, 157, 0.8)",
"rgba(82, 165, 196, 0.8)",
"rgba(102, 206, 245, 0.8)",
"rgba(170, 228, 249, 0.8)",
]
const cwmColors = [
"rgba(98, 142, 61, 0.8)",
"rgba(122, 178, 76, 0.8)",
"rgba(152, 223, 95, 0.8)",
"rgba(198, 237, 165, 0.8)",
]
const generateChart = (ctx, data, colors, extraOpts = {}) => {
const xLabels = [2020, 2030, 2040, 2050];
const datasets = data.map((el, index) => ({
    label: el.label,
    data: el.values,
    borderColor: colors[index],
    backgroundColor: colors[index],
    fill: {
      target: '+1',
      above: colors[index],
      below: "rgba(0,0,0,0)",
    },
  }))
datasets[datasets.length - 1].fill.target = 'origin';

new Chart(ctx, {
type: 'line',
data: {
  labels: xLabels,
  datasets
},
options: extraOpts
});
}

const ctx8 = document.getElementById('myChart8');
const ctx9 = document.getElementById('myChart9');
const ctx10 = document.getElementById('myChart10');
generateChart(ctx8, [{
label: "Uncontrolled disposal",
values: [919.9674576, 1200.836778, 1491.226094, 1789.328835]
}, {
label: "Landfill disposal",
values: [400.799206, 496.239687, 586.9488973, 678.3209265]
}, {
label: "Thermal treatment and disposal",
values: [142.6323835,180.2495553,212.9134862,243.3913894]
}, {
label: "Transport",
values: [134.7865736, 170.1383839, 204.7189751, 239.7839727]
}], wmauColors, {
scales: {
  y: {
    position: 'left',
    max: 2000,
    title: {
      text: 'Billions of kg CO2 eq',
      display: true
    }
  },
},
responsive: true,
aspectRatio: 1.5
});
generateChart(ctx9, [
{ "label": "Uncontrolled disposal", "values": [29569.46282,38597.12446,47930.77646,57512.35225 ]},
{ "label": "Landfill disposal", "values": [20459.32842,25331.21469,29961.58694,34625.79367] },
{ "label": "Thermal treatment and disposal", "values": [5784.632984,7310.243981,8634.970156,9871.039273] },
{ "label": "Transport", "values": [71.07633511,89.71822982,107.9534414,126.4440926] },
], wmauColors, {
scales: {
  y: {
    position: 'left',
    max: 60000,
    title: {
      text: 'Trillions PDF.m3.day',
      display: true
    }
  }
},
responsive: true,
aspectRatio: 1.5
})

const ctx11 = document.getElementById('myChart11');
const ctx12 = document.getElementById('myChart12');
const ctx13 = document.getElementById('myChart13');
generateChart(ctx11, [
  {
      "label": "Uncontrolled disposal",
      "values": [919.9674576, 794.5670972, 460.5595648, 0]
  },
  {
      "label": "Landfill disposal",
      "values": [400.799206, 586.014834, 744.0371329, 942.2036729]
  },
  {
      "label": "Thermal treatment and disposal",
      "values": [142.6323835, 203.9629395, 227.3035403, 246.1841495]
  },
  {
      "label": "Transport",
      "values": [134.7865736, 170.1383839, 185.3269974, 199.4646247]
  }
], wucColors, {
scales: {
  y: {
    position: 'left',
    max: 2000,
    title: {
      text: 'Billions of kg CO2 eq',
      display: true
    }
  }
},
responsive: true,
aspectRatio: 1.5
});
generateChart(ctx12, [
{ "label": "Uncontrolled disposal", "values": [29569.46282,25538.86232,14803.23985,0] },
{ "label": "Landfill disposal", "values": [20459.32842,29913.90644,37980.36482,48096.03936] },
{ "label": "Thermal treatment and disposal", "values": [5784.632984,8271.969649,9218.576624,9984.303117] },
{ "label": "Transport", "values": [71.07633511,89.71822982,97.72756603,105.1826909]}
], wucColors, {
scales: {
  y: {
    position: 'left',
    max: 60000,
    title: {
      text: 'Trillions PDF.m3.day',
      display: true
    }
  }
},
responsive: true,
aspectRatio: 1.5
})

const ctx14 = document.getElementById('myChart14');
const ctx15 = document.getElementById('myChart15');
const ctx16 = document.getElementById('myChart16');

generateChart(ctx14, [
{ "label": "Uncontrolled disposal" 	, "values":[ 919.9674576,794.5670972,428.1936818,0] },
{ "label": "Landfill disposal" 	, "values":[ 400.799206,423.1848221,366.8925707,283.2625303] },
{ "label": "Thermal treatment and disposal" 	, "values":[ 142.6323835,190.1798349,185.1873371,132.772916] },
{ "label": "Transport"	, "values":[ 134.7865736,170.1383839,170.1383839,134.7865736] },
], cwmColors, {
scales: {
  y: {
    position: 'left',
    max: 2000,
    title: {
      text: 'Billions of kg CO2 eq',
      display: true
    }
  }
},
responsive: true,
aspectRatio: 1.5
});
generateChart(ctx15, [
{ "label": "Uncontrolled disposal", "values": [ 29569.46282,25538.86232,13762.94026,0 ] },
{ "label": "Landfill disposal", "values": [ 20459.32842,	21602.03196,	18728.51914,	14459.51252 ] },
{ "label": "Thermal treatment and disposal", "values": [ 5784.632984,	7712.978769,	7510.501837,	5384.770068 ] },
{ "label": "Transport", "values": [ 71.07633511,	89.71822982,	89.71822982,	71.07633511 ] }
], cwmColors, {
scales: {
  y: {
    position: 'left',
    max: 60000,
    title: {
      text: 'Trillions PDF.m3.day',
      display: true
    }
  }
},
responsive: true,
aspectRatio: 1.5
});

// Chart 6
const ctx17 = document.getElementById('myChart17');
const datasets_for_chart6 = {
"Recycling": {
  "values": [20.1, 32.0,	45.1,	49.9],
  backgroundColor: "rgba(225, 102, 245, 0.8)",
}, 
"Landfill": {
  "values": [34.6,	57.1,	64.4,	25.5],
  backgroundColor: "rgba(82, 165, 196, 0.8)",
}, 
"Thermal": {
  "values": [31.5,	53.4,	53.7,	24.8],
  backgroundColor: "rgba(133, 216, 247, 0.8)",
}, 
"Collection": {
  "values": [149.1,	243.0,	230.7,	154.4],
  backgroundColor: "rgba(152, 223, 95, 0.8)",
},
"Dumping": {
  "values": [17.0,	31.8,	0.0,	0.0],
  backgroundColor: "rgba(85, 85, 85, 0.8)",
},
"Externalities (impacts)": {
  values: [243.3, 443.1,	263.6,	108.5],
  backgroundColor: "rgba(0, 0, 0, 0)",
  borderColor: "rgba(144, 66, 157, 1)",
  borderWidth: 1,
},
"Externalities (recycling gains)": {
  values: [-134.6,	-220.1,	-387.4,	-471.1],
  backgroundColor: "rgba(0, 0, 0, 0)",
  borderColor: "rgba(152, 223, 95, 1)",
  borderWidth: 1,
}
}
const labels_for_chart6 = ["2020", "2050: Business as usual", "2050: Controlled", "2050: Lifecycle approach"];
const sumFirst = Object.values(datasets_for_chart6).reduce((acc, value, index) => {
if (value.values[0] > 0) {
  return acc + value.values[0]
} else {
  return acc;
}
}, 0);
const sumLast = Object.values(datasets_for_chart6).reduce((acc, value, index) => {
if (value.values[value.values.length -1] > 0) {
  return acc + value.values[value.values.length -1]
} else {
  return acc;
}
}, 0);

const options_for_chart6 = {
scales: {
  y: {
    stacked: true,
    title: {
      display: true,
      text: 'US$ (billions)'
    }
  },
  x: {
    stacked: true
  }
}
};
const config_for_chart6 = {
type: 'bar',
data: {
  labels: labels_for_chart6,
  datasets: Object.entries(datasets_for_chart6).map(([key, value]) => {
    const {values, ...rest} = value;
    return {
      label: key,
      data: values,
      ...rest
    }
  })
},
options: options_for_chart6
};
new Chart(ctx17, config_for_chart6);
