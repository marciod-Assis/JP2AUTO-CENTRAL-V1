export const sectors = ['Comercial / triagem', 'Vendas e orçamentos', 'Logística', 'Financeiro', 'Suporte técnico / SAC', 'Garantia', 'Avaliação de novos produtos'];
export const states = ['Aguardando empresa', 'Em atendimento', 'Aguardando cliente', 'Pendente interno', 'Finalizado'] as const;
export type State = typeof states[number];
export type Event = {at: string; text: string};
export type Ticket = {id: string; client: string; code: string; os: string; protocol: string; origin: string; sector: string; owner: string; subject: string; state: State; nextActor: string; followup: string; created: string; since: string; elapsed: number; sla: number; closed?: string; rating: number; events: Event[]};
export type Member = {id: string; name: string; sector: string; active: boolean};
export type Settings = {company: string; start: number; end: number; weekdays: number[]; warning: number};
export type Data = {version: 2; tickets: Ticket[]; members: Member[]; slas: Record<string,number>; settings: Settings; integrations: {digisac: string; trello: string}};
export function initialData(): Data {return {version:2,tickets:[],members:[],slas:Object.fromEntries(sectors.map((s,i)=>[s,[5,10,20,20,15,30,240][i]])),settings:{company:'JP2auto',start:8,end:18,weekdays:[1,2,3,4,5],warning:80},integrations:{digisac:'https://jp2comercio.digisac.me/',trello:'https://trello.com/b/mzGKP0aQ/suporte-tecnico-jp2auto'}};}
// Calendar follows the operating system timezone; configure the machine to the company's timezone.
export function businessMinutes(from: string,to: string,settings: Settings): number {
 const begin=new Date(from), finish=new Date(to); if(!Number.isFinite(+begin)||!Number.isFinite(+finish)||finish<=begin)return 0;
 let total=0; const day=new Date(begin); day.setHours(0,0,0,0);
 while(day<finish){if(settings.weekdays.includes(day.getDay())){const a=new Date(day),b=new Date(day);a.setHours(settings.start,0,0,0);b.setHours(settings.end,0,0,0);total+=Math.max(0,Math.min(+finish,+b)-Math.max(+begin,+a))/60000;}day.setDate(day.getDate()+1);}
 return total;
}
export function running(t: Ticket){return t.state==='Aguardando empresa'||t.state==='Em atendimento'||t.state==='Pendente interno';}
export function waitMinutes(t:Ticket,s:Settings,now:string){return t.elapsed+(running(t)?businessMinutes(t.since,now,s):0);}
export function health(t:Ticket,s:Settings,now:string){if(t.state==='Finalizado')return 'Finalizado';if(t.state==='Aguardando cliente')return 'Pausado';const m=waitMinutes(t,s,now);return m>=t.sla?'Atrasado':m>=t.sla*s.warning/100?'Atenção':'No prazo';}
export function transition(t:Ticket,state:State,s:Settings,now:string,note:string): Ticket {
 return {...t,state,elapsed:waitMinutes(t,s,now),since:now,closed:state==='Finalizado'?now:undefined,events:[...t.events,{at:now,text:note}]};
}
export function decodeBackup(raw:string):Data {
 const d=JSON.parse(raw); if(d?.version!==2||!Array.isArray(d.tickets)||!Array.isArray(d.members)||!d.settings||!d.slas||!d.integrations)throw Error('Arquivo não é um backup V2.');
 const s=d.settings;if(typeof s.company!=='string'||!Number.isInteger(s.start)||!Number.isInteger(s.end)||s.start<0||s.end>24||s.start>=s.end||!Array.isArray(s.weekdays)||!s.weekdays.length||s.weekdays.some((v:unknown)=>typeof v!=='number'||!Number.isInteger(v)||v<0||v>6)||!Number.isFinite(s.warning)||s.warning<1||s.warning>99)throw Error('Configuração inválida.');
 const date=(v:unknown)=>typeof v==='string'&&Number.isFinite(Date.parse(v));
 for(const t of d.tickets){if(!['id','client','code','os','protocol','origin','sector','owner','subject','nextActor','followup'].every(k=>typeof t[k]==='string')||!states.includes(t.state)||!date(t.created)||!date(t.since)||!Number.isFinite(t.elapsed)||t.elapsed<0||!Number.isFinite(t.sla)||t.sla<=0||!Number.isFinite(t.rating)||t.rating<0||t.rating>5||!Array.isArray(t.events)||t.events.some((e:Event)=>!date(e.at)||typeof e.text!=='string'))throw Error('Atendimento inválido no backup.');}
 if(new Set(d.tickets.map((t:Ticket)=>t.id)).size!==d.tickets.length)throw Error('Protocolos locais duplicados.');
 for(const m of d.members){if(typeof m.id!=='string'||typeof m.name!=='string'||!sectors.includes(m.sector)||typeof m.active!=='boolean')throw Error('Colaborador inválido.');}
 if(!sectors.every(k=>Number.isFinite(d.slas[k])&&d.slas[k]>0)||!['digisac','trello'].every(k=>typeof d.integrations[k]==='string'))throw Error('Regras ou integrações inválidas.');return d;
}
