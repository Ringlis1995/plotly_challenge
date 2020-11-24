//This code follows the instructor's recipe from office hours, thanks to Dom for the help

console.log("hello");

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);
}

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);
    
    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();



        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }
        
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}

        };

        Plotly.newPlot("bar", [barData], barLayout);
    });
}

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);
    
    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        //var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {size: sample_values, color: otu_ids, colorscale: "Earth"}
        }
        
        var barLayout = {
            title: "Bacteria Cultures per Sample",
            margin: {t: 30}

        };

        Plotly.newPlot("bubble", [bubbleData], barLayout);
    });
}

function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`);

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];

        var panel = d3.select(`#sample-metadata`); 
        panel.html("");

        Object.entries(result).forEach(([key,value]) => {

            var textToShow = `${key} = ${value}`;
            panel.append("h6").text(textToShow);

        });

    });

}

function optionChanged(newSampleId)
{
    console.log(`User selected ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard()
{
    console.log("Calling InitDashboard()");


    var selector = d3.select("#selDataset");

    //read samples.json into javascript code
    d3.json("samples.json").then((data) => {
        console.log(data);

        //Get names
        var sampleNames = data.names;


        //populate selector with all sample IDs
        sampleNames.forEach((sampleId) => {
            selector.append("option").text(sampleId).property("value", sampleId);

        });

        //Get first sample Id
        var sampleId = sampleNames[0];
        console.log("Starting Sample: ", sampleId);


        //draw the graphs
        DrawBargraph(sampleId);
        DrawBubblechart(sampleId);
        ShowMetadata(sampleId);

    });
}
InitDashboard();


