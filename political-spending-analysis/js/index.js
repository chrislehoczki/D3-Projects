var overviewData = [[{title: "Overview of Findings", xLabel: "Party Data", yLabel: "Total (Billion £)", tooltip: "Total: ", tooltipUnit: "Billion £", explanation: "Richard Murphy has recently investigated claims that Labour have borrowed more consistently when in power. He has refuted the idea. He has carefully analysed the last 70 years of party borrowing and spending. The graph here based on his analysis shows that not only have Labour borrowed less, but they have also repaid more national debt when in office. To remove bias, this data comes from before the 2008 crisis and has taken into account inflation. You can view the original article and dataset links <a target='_blank' href=\"http://www.taxresearch.org.uk/Blog/2016/03/13/the-conservatives-have-been-the-biggest-borrowers-over-the-last-70-years/\">here.</a> Click the button above to investigate his data."}],[{party: "Labour Total Borrowing",class: "Labour",  borrowing: 461.6}, {party: "Conservative Total Borrowing", class: "Conservative", borrowing: 742.9}, {party: "Labour Total Debt Repayment", class: "Labour", borrowing: 108.8}, {party: "Conservative Total Debt Repayment", class: "Conservative", borrowing: 19.9}]];

 var averageSpending = [[{title: "Average Borrowing Per Year In Office", xLabel: "Party", yLabel: "Average Spending Per Year (Billion £)", tooltip: "Borrowing Per Year: ", tooltipUnit: "Billion £", explanation: "At first Richard decided to compare average spending per year for each party. The Conservatives clearly borrowed more on average."}],[{party: "Labour", class: "Labour", borrowing: 17.4}, {party: "Conservative", class: "Conservative", borrowing: 22.9}]]
 
  var averageSpending2014 = [[{title: "Average Borrowing Per Year - 2014 Prices", xLabel: "Party", yLabel: "Average Borrowing Per Year - 2014 Prices (Billion £)", tooltip: "Borrowing Per Year: ", tooltipUnit: "Billion £", explanation: "Richard then adjusted prices for inflation using 2014 prices as a benchmark. The Conservatives still borrowed more, far more. "}],[{party: "Labour", class: "Labour",  borrowing: 26.8}, {party: "Conservative", class: "Conservative", borrowing: 33.5}]]
  
 
   var averageSpendingBefore2008 = [[{title: "Average Borrowing Per Year Before 2008", xLabel: "Party Data", yLabel: "Average Borrowing Per Year (Billion £)", tooltip: "Borrowing Per Year: ", tooltipUnit: "Billion £", explanation: "People might say that this data is distorted because after 2008 the Conservatives had to \"clear up Labour's mess.\" This graph shows only data from before 2008. For the original prices it's close, but on the 2014 adjusted price, you can clearly see that the Conservatives borrowed more."}],[{party: "Labour Borrowing - Original Prices", class: "Labour",  borrowing: 8.82}, {party: "Conservative Borrowing - Original Prices", class: "Conservative", borrowing: 8.88}, {party: "Labour Borrowing - 2014 Prices", class: "Labour", borrowing: 17.8}, {party: "Conservative Borrowing - 2014 Prices",  class: "Conservative", borrowing: 20.6}]]
  
     var averageSpending2014Prices = [[{title: "Average Borrowing Per Year Before 2008 - 2014 Prices", xLabel: "Party Data", yLabel: "Average Spending Per Year - 2014 Prices (Billion £) ", tooltip: "Borrowing Per Year: ", tooltipUnit: "Billion £", explanation: "Richard then did this for the 2014 adjusted prices. This showed that the Conservatives have clearly borrowed more."}],[{party: "Labour", class: "Labour", borrowing: 17.8}, {party: "Conservative",  class: "Conservative", borrowing: 20.6}]]
     
          var totalBorrowing = [[{title: "Total Borrowing", xLabel: "Party Data", yLabel: "Total Borrowing (Billion £) ", tooltip: "Borrowing Total: ", tooltipUnit: "Billion £", explanation: "The total borrowing data is even more interesting. The Conservatives borrowed more in original and 2014 adjusted prices."}],[{party: "Labour Borrowing - Original Prices", class: "Labour", borrowing: 229.3}, {party: "Conservative Borrowing - Original Prices",  class: "Conservative", borrowing: 319.6}, {party: "Labour Borrowing - 2014 Prices", class: "Labour", borrowing: 461.6}, {party: "Conservative Borrowing - 2014 Prices",  class: "Conservative", borrowing: 742.9}]]
                       
var borrowingPercentageYears = [[{title: "Percentage of Years In Office When Debt Repaid", xLabel: "Party Data", yLabel: "Percentage", tooltip: "Total Percentage Years Repaid: ", tooltipUnit: "%", explanation: "Richard then decided to investigate the repayments of national debt. The graph shows that Labour have paid back far more of their national debt in percentage terms. 25% of the time Labour were in power, they repaid their debt. The Conservatives only repaid 9% of the time. "}],[{party: "Labour", class: "Labour",  borrowing: 25}, {party: "Conservative", class: "Conservative", borrowing: 9}]]

var totalRepaymentsMade = [[{title: "Total Repayments Made In Office", xLabel: "Party Data", yLabel: "Total (Billion £)", tooltip: "Total Repayments Made: ", tooltipUnit: "Billion £", explanation: "Richard then analysed the total debt paid off by each party. Labour not only repaid more often, they also repaid much more."}],[{party: "Labour - Original Prices", class: "Labour", borrowing: 38.7},  {party: "Conservative - Original Prices", class: "Conservative", borrowing: 7}, {party: "Labour 2014 Price Adjusted", class: "Labour", borrowing: 108.8},{party: "Conservative 2014 Price Adjusted", class: "Conservative", borrowing: 19.9}]];

var finalSlide = [[{title: "End of Exploration", xLabel: "Party Data", yLabel: "Total (Billion £)", tooltip: "Total: ", tooltipUnit: "Billion £", explanation: "What do you think of these figures? Send me a message on Twitter <a target='_blank' href=\"http://www.twitter.com/chrispwebdev\">@chrispwebdev</a> or contact <a target='_blank' href=\"http://www.taxresearch.org.uk/\">Richard</a> directly. "}],[{party: "Labour Total Borrowing",class: "Labour",  borrowing: 461.6}, {party: "Conservative Total Borrowing", class: "Conservative", borrowing: 742.9}, {party: "Labour Total Debt Repayment", class: "Labour", borrowing: 108.8}, {party: "Conservative Total Debt Repayment", class: "Conservative", borrowing: 19.9}]];
  
//DECLARE DATASET
 var dataset = [overviewData, averageSpending, averageSpending2014, averageSpendingBefore2008, totalBorrowing, borrowingPercentageYears, totalRepaymentsMade, finalSlide]
 
 var dataNumber = 0;

makeGraph(dataset[dataNumber])

 $("#nextGraph").click(function() {
   
  //ANIMATION AND DATA CHANGE
  $(".tooltip").fadeOut("fast")
  $(".explanation").fadeOut("slow")
  $(".graph-title").fadeOut("slow")
  $("#nextGraph").fadeTo("slow", 0)

      
  $("svg").fadeTo("slow", 0, function() {

    if (dataNumber < dataset.length -1) {
      dataNumber += 1;
    }
    else {
      dataNumber = 0;
    }
    makeGraph(dataset[dataNumber])

  })

})
 

 //FUNCTION TO MAKE GRAPH IN D3
 function makeGraph(data) {
  //ANIMATION AND DATA
    $("svg").remove()
    $(".explanation").fadeIn("slow")
    $(".graph-title").fadeIn("slow")
    $("#nextGraph").fadeTo("slow", 0.8)
    $(".graph-title").text(data[0][0].title)
    $(".explanation").html(data[0][0].explanation)
   
  var graphData = data[1];
   
   
  var margin = {top: 100, right: 20, bottom: 120, left: 60},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


 var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select(".graph").append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 

  x.domain(graphData.map(function(d) { return d.party; }));
  y.domain([0, d3.max(graphData, function(d) { return d.borrowing; })]);

    var bars = svg.selectAll(".bar")
    .data(graphData)
    .enter()
    .append("rect")
    
    
      bars
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.party); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return height; })
      .attr("height", function(d) { return 0; });
      

      bars.transition()
      .duration(1000) // this is 1s
      .delay(10)
      .attr("fill", function(d) { return colorIt(d.class)})
      .style("opacity", "0.8")
      .attr("x", function(d) { return x(d.party); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.borrowing); })
      .attr("height", function(d) { return height - y(d.borrowing); });

 bars.on("mouseover", function(d) {
         d3.select(this)
            	.style("opacity", "1")
        
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.9)
        tooltip.html(data[0][0].tooltip + d.borrowing + " " + data[0][0].tooltipUnit)  
            .style("left", (d3.event.pageX + 10) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
  })
 
   bars.on("mouseout", function(d) {
     d3.select(this)
            	.style("opacity", "0.8")
     tooltip.transition()
        .duration(200)
        .style("opacity", 0)
   })
      
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".06em")
            .attr("transform", "rotate(-30)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
   
   
   addLabels(height, margin, width, svg, data)
   
 }
 

function addLabels(height, margin, width, svg, data) {
   console.log(data[0])
  var title = data[0][0].title;
  var xLabel = data[0][0].xLabel;
  var yLabel = data[0][0].yLabel;

  //ADD Y LABEL
   var yLabel = svg.append("text")
     .attr("x", 0 - height/2)
     .attr("y", 0 - margin.left/1.5)
      .style("text-anchor", "middle")
      .text(yLabel)
      .attr('transform', 'rotate(-90)')
      .classed("label", true)
   //ADD X LABEL
    svg.append("text")
     .attr("x", width / 2 - 30)
     .attr("y", height + margin.bottom/1.05)
      .style("text-anchor", "middle")
      .text(xLabel)
      .classed("label", true)
      
}

  
function colorIt(party) {
    if (party === "Conservative") {
      return "blue";
    }
  else {
    return "#ed0e0e";
  }
}