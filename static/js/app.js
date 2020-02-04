
function optionChanged(idNo) {
    d3.json("https://alexandraoricchio.github.io/Interactive-Dashboard-Challenge/samples.json").then((data) =>{
        var sampleData = data.samples.filter(sample => sample.id == idNo);
        var ids = sampleData[0].otu_ids;
        var otu_ids = ids.map(id => `OTU ${id}`);
        var sample_values = sampleData[0].sample_values;
        var otu_labels = sampleData[0].otu_labels;

        console.log(sampleData);
        console.log(ids);
        console.log(otu_ids);
        console.log(sample_values);
        // console.log(otu_labels);

        // BAR CHART 
        var barTrace = {
            x: sample_values,
            y: otu_ids,
            type: "bar",
            orientation: "h"
        };
        var barData = [barTrace];
        Plotly.newPlot("bar",barData);

        // BUBBLE CHART
        var bubbleColors = [];
        for (var i=0; i<ids.length; i++) {
            var r = Math.ceil((Math.random()*255));
            var g = Math.ceil((Math.random()*255));
            var b = Math.ceil((Math.random()*255));
            var rgb = `rgb(${r}, ${g}, ${b})`;
            bubbleColors.push(rgb);
        };
        console.log(bubbleColors);

        var bubbleTrace = {
            x: ids,
            y: sample_values,
            mode: "markers",
            text: otu_labels,
            marker: {
                size: sample_values,
                color: bubbleColors
            }
        };
        var bubbleData = [bubbleTrace];
        var bubbleLayout = {
            showlegend: false,
            xaxis: {
                title: "OTU ID"
            }
        };
        Plotly.newPlot("bubble",bubbleData,bubbleLayout);

        // DEMOGRAPHIC INFO
        var metaData = data.metadata.filter(sample => sample.id == idNo);
        var metaDataObject = metaData[0];
        console.log(metaData);
        console.log(metaDataObject);

        var table = d3.select("#meta-table");
        var tbody = table.select("tbody");
        tbody.html("");
        Object.entries(metaDataObject).forEach(([key,value])=> {
            var row = tbody.append("tr");
            var cell = row.append("td").text(`${key}: ${value}`);
        });

    });
};

// create function that adds dropdown options to dropdown menu
// based on the names from the json file sample data
function options() {
    d3.json("https://alexandraoricchio.github.io/Interactive-Dashboard-Challenge/samples.json").then((data) => {
        var menuOptions = data.names;
        // console.log(menuOptions);
        var defaultName = menuOptions[0];
        console.log(defaultName)
        var menu = d3.select("#selDataset");
        menu.append("option").text("Select ID");
        menuOptions.forEach(option => {
            menu.append("option").text(option);
        });
        optionChanged(defaultName);
    });
};
// run function
options();

// event listener is in html
// d3.select("#selDataset").on("change",optionChanged);


