import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartTooltip, // <-- Add this line
  } from "@progress/kendo-react-charts";
  import { COLORS } from "./constants";
  import React, {useEffect,useState} from 'react'
import { auth,db } from "../firebase";


  

  
  
  const Charts = () => {
    const [activeSurveys,setActiveSurveys] = useState(0)
    const [inActiveSurveys,setInactiveSurveys] = useState(0)

    const [posts, setPosts] = useState("")

  // Show category label for each item in the donut graph
  const labelContent = e => e.category;
    useEffect(() => {
      db.collection('surveys').where("ownerId","==", `${auth?.currentUser?.uid}`).where("active", "==", true)
     .onSnapshot(snapshot => (
      setActiveSurveys(snapshot.docs.length)
     ))
  }, []);

  useEffect(() => {
    db.collection('surveys').where("ownerId","==", `${auth?.currentUser?.uid}`).where("active", "==", false)
   .onSnapshot(snapshot => (
    setInactiveSurveys(snapshot.docs.length)
   ))
}, []);

  useEffect(() => {
    db.collection('surveys').orderBy("timestamp", "desc").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);
      // Graph data
  const applicationsStatusThisMonth = [
    {
      status: "Inactive",
      value: inActiveSurveys,
      color: COLORS.accepted,
    },
    {
      status: "Active",
      value: activeSurveys,
      color: COLORS.interviewing,
    },


  ];

  const applicationsStatusThisMonth1 = [

    {
      status: "No surveys",
      value: 100,
      color: COLORS.total,
    },


  ];
  


    const renderTooltip = context => {
        const { category, value } = context.point || context;
        return (
          <div>
            {category}: {value}
          </div>
        );
      };

      const renderTooltip1 = context => {
        const { category, value } = context.point || context;
        return (
          <div>
            No surveys: 0
          </div>
        );
      };

    return (
        <>
        {activeSurveys === 0 && inActiveSurveys === 0 ?(
          <Chart >
          <ChartLegend visible={false} />
    <ChartTooltip render={renderTooltip1} />
          <ChartSeries>
            <ChartSeriesItem
              type="donut"
              data={applicationsStatusThisMonth1}
              categoryField="status"
              field='value'
            >
              <ChartSeriesLabels
                color="#fff"
                background="none"
                content={labelContent}
              />
            </ChartSeriesItem>
          </ChartSeries>
        </Chart>
        ): (
<Chart >
        <ChartLegend visible={false} />
  <ChartTooltip render={renderTooltip} />
        <ChartSeries >
          <ChartSeriesItem
            type="donut"
            data={applicationsStatusThisMonth}
            categoryField="status"
            field='value'
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              content={labelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
        )}

  
      
      </>
    );
  };
  
  export default Charts;
  