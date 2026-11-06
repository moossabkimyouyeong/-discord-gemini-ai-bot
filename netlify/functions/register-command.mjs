export default async (request) => {
  if (request.method !== "POST") return new Response("POST required", {status:405});
  const token = Netlify.env.get("DISCORD_BOT_TOKEN");
  const app = Netlify.env.get("DISCORD_APPLICATION_ID");
  if (!token || !app) return Response.json({ok:false,error:"Missing DISCORD_BOT_TOKEN or DISCORD_APPLICATION_ID in Netlify"},{status:500});
  const result = await fetch("https://discord.com/api/v10/applications/"+app+"/commands",{
    method:"POST",headers:{"authorization":"Bot "+token,"content-type":"application/json"},
    body:JSON.stringify({name:"메뉴",description:"Gemini AI 기능 버튼 메뉴",type:1})
  });
  const data = await result.json().catch(()=>({}));
  return Response.json({ok:result.ok,status:result.status,name:data.name||null,error:result.ok?null:(data.message||"Discord API rejected request")},{status:result.ok?200:502});
};
export const config={path:"/register-command"};