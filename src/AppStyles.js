import styled from "styled-components";

export const PageContainer = styled.div`
   display: flex;
   max-width: 1200px;
   width: 100%;
   margin: 0 auto;
   min-height: 100vh;
   justify-content: center;
   align-items: center;
   align-self: center;
   justify-self: center;
`;
export const Formular = styled.form`
   width: 800px;
   min-height: 800px;
   background-color: #c8e4e6;
   border:2px solid #79B5BA;
   border-radius:15px;
   box-shadow: 10px 10px 15px #999;
   display: grid;
   grid-template-columns: 1fr;
   grid-template-areas:
      'nadpis'
      'delkaZap'
      'vyber'
      'doplnky'
      'kalkulace';
`;
export const FormSection = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   padding: 20px;
   &:nth-child(1){
      grid-area: nadpis;
   }
   &:nth-child(2){
      grid-area: delkaZap;
   }
   &:nth-child(3){
      grid-area: vyber;
   }
   &:nth-child(4){
      grid-area: doplnky;
   }
   &:nth-child(5){
      grid-area: kalkulace;
   }
`;
export const SectionTitle = styled.h2`
   color: #525252;
   font-size: 20px;
   margin: 0px;
   padding: 0;
   padding-bottom: 10px;
`;
export const MainTitle = styled(SectionTitle)`
   color: #333;
   font-size: 30px;
   align-self: center;
   justify-self: center;
`;
export const InputDiv = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
`;

export const KontrolaButton=styled.div`
   display:flex;
   margin-top:20px;
   background-color: #DFDCF5;
   border: 1px solid #AAA7CC;
   border-radius: 10px;
   cursor: pointer;
   justify-content:center;
   align-items:center;
   ${props=>{
      if(props.checkedPrice===1){
         return `
            background-color:#92F8B4;
         `;
      }
      else if(props.checkedPrice===2){
         return `
            background-color:#C5560D;
            color: #fff;
         `;
      }
   }}
`;


export const Potvrdit=styled.div`
display:flex;
margin-top:20px;
background-color: white;
border: 1px solid black;
cursor: pointer;
justify-content:center;
align-items:center;
`;