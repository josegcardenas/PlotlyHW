function buildMetadata(id) {
    d3.json("samples.json").then((data) => {
        //console.log(data)
        var metadata = data.metadata;
        //console.log(metadata);

        // Filter by ID
        var filterResult = metadata.filter(sampleobject => sampleobject.id == id);
        var result = filterResult[0];
        var PANEL = d3.select("#sample-metadata");

        //.html("") clears data that is already there
        PANEL.html("");

        Object.entries(result).forEach((key) =>{
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
};
//import data and run through fun
function plotChart(id) {

    d3.json("samples.json").then((data) => {
        // console.log(data)
        var samples = data.samples.filter(sampleobject => sampleobject.id.toString() === id) [0];


        // Filtering wfreq by id
        var wfreq = data.metadata.filter(f => f.id.toString() === id) [0];
        console.log(wfreq.wfreq)
        var washFrequency = wfreq.wfreq;
        //console.log("Washing Frequency: " + washFrequency);
        
        //Top 10 labels to plot
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
        console.log("Top 10 sample: " + samplevalues);
 
        var OTU = (samples.otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU.map(d => "OTU " + d)
  
        console.log("OTU IDS: " + OTU_id);
  
  
        //reverse plot labels
        var labels = samples.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels);
  
        // Trace for the plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'green'},
            type: 'bar',
            orientation: 'h'    
            };

        // Data variable
        var barLayout = {
            title: "Top 10 Bacteria Found",
            margin: { t: 30, l: 150 }
          };
        // Bar plot
        Plotly.newPlot("bar", [trace], barLayout);

        //Bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: "Earth",
            
            }
            
        };
         
         //Bubble Plot layout
         var layout_b = {
             title: "Bacteria in Each Sample",
             margin: {t:0},
             xaxis: {title: "OTU ID"},
             margin: {t: 30}
            
         };
         // Bubble plot
         Plotly.newPlot("bubble", [trace1], layout_b);

         // Gauge chart
         var gaugemetric = [
             {
                 domain: {x: [0,1], y: [0,1]},
                 value: washFrequency,
                 title: {text: `Belly Button Washing Frequency`},
                 type: "indicator",

                 mode: "gauge+number",
                 gauge: {axis: {range: [null, 9]},
                 steps: [
                     {range: [0, 1], color: "crimson"},
                     {range: [1, 2], color: "orangered"},
                     {range: [2, 3], color: "orange"},
                     {range: [3, 4], color: "gold"},
                     {range: [4, 5], color: "yellow"},
                     {range: [5, 6], color: "greenyellow"},
                     {range: [6, 7], color: "lime"},
                     {range: [7, 8], color: "limegreen"},
                     {range: [8, 9], color: "green"}
                 ]}
             }
         ];
         var gauge_display = {
             width: 700,
             height: 600,
             margin: {t: 20, b: 40, l:100, r:100}
        };
        Plotly.newPlot("gauge", gaugemetric, gauge_display);
        }
    );
}
function init() {
    // Read the data
    d3.json("samples.json").then((data) => {
        //console.log(data);
        plotChart("940") 
        data.names.forEach((name) => {
            d3.select("#selDataset").append("option").text(name).property("value");
        });
    })
};

//New data clicked
function newOption(changedSample) {
    plotChart(changedSample);
    buildMetadata(changedSample);
    }
          

init();
