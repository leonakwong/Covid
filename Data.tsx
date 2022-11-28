import React from 'react'
import { Link } from "react-router-dom";
//import "../Styles/Visual";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import * as faker from 'faker';
    
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vaccine Heistancy Chart',
      },
    },
  };
  
  const labels = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'NE', 'NH', 'NJ', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'SC', 'SD', 'TN', 'TX', 'VA', 'WA', 'WI', 'WV', 'WY'];
  
  export const Data = {
    labels,
    datasets: [
      {
        label: 'Estimated Heistant',
        data: [0.15924000000000002,0.07227413793103449,0.0782203125,0.056987499999999996,0.0655,0.05943333333333333,0.14521194029850742,0.16181509433962252,0.0595,0.12626464646464655,0.19202272727272726,0.09608529411764706,0.13146521739130435,0.1516476190476191,0.19584916666666666,0.18971874999999994,0.046278571428571426,0.07601666666666666,0.09565625,0.09963132530120475,0.07788620689655174,0.15022782608695648,0.18253170731707313,0.25138571428571416,0.1315,0.08678817204301079,0.10354,0.0496952380952381,0.13242352941176472,0.06652142857142858,0.1423,0.193325,0.1085,0.12079999999999999,0.14301428571428573,0.1018,0.11383333333333334,0.12063604651162789,0.06130294117647061,0.08134,0.15628,0.1072,0.21895454545454543],
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
      },
      {
        label: 'Estimated Unsure or Hesitant',
        data: [0.2642448275862069,0.23151194029850744,0.26123199999999996,0.24254666666666672,0.11104137931034487,0.12257031249999992,0.08222499999999999,0.085,0.12306666666666666,0.20214029850746268,0.23721886792452865,0.09631999999999999,0.1827777777777779,0.2575749999999999,0.1611490196078431,0.17868043478260867,0.2057914285714286,0.25076249999999994,0.2670390625,0.06877857142857144,0.11014583333333333,0.13143125,0.1753120481927711,0.11901379310344833,0.209491304347826,0.2906951219512195,0.3004178571428571,0.19005,0.1319612903225807,0.12916000000000002,0.1087047619047619,0.21218823529411762,0.12434285714285713,0.1970916666666667,0.2564,0.137225,0.17090769230769232,0.2201999999999999,0.14776666666666669,0.16643333333333335,0.18263604651162793,0.12500882352941178,0.12938,0.20606,0.171,0.28417272727272724],
        backgroundColor: 'rgba(200, 200, 0, 0.5)',
      },
      {
        label: 'Estimated Strongly Hesitant',
        data: [0.15690689655172407,0.1324089552238806,0.13990133333333332,0.12135333333333333,0.03580689655172413,0.04727499999999998,0.0315125,0.0403,0.034833333333333334,0.09720746268656717,0.10311949685534601,0.03174,0.07588181818181822,0.1256931818181818,0.05922745098039219,0.08268152173913046,0.09312857142857142,0.12942416666666665,0.11699531250000005 ,0.0336857142857142840,.04025416666666666,0.0785625 ,0.061314457831325296,0.04196436781609196 ,0.09039999999999992,0.12542439024390248 , 0.17083035714285716,0.10120000000000001,0.05350537634408603,0.0679,0.03371428571428571,0.07152352941176471,0.04667857142857144,0.08600833333333331,0.134575,0.08172499999999999,0.0802307692307692,0.08052857142857144,0.07490000000000001,0.07123333333333334,0.08060116279069773,0.041917647058823525,0.0591,0.09341999999999999,0.0822,0.15960000000000002],
        backgroundColor: 'rgba(255, 30, 30, 0.5)',
      },
    ],
  };
  
  export function DataComponent() {
    return <Bar options={options} data={Data} />;
  }