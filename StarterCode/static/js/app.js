console.log("hello");

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);
}

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);
}

function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`);
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


