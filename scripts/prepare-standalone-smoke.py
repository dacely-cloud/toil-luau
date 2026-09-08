from pathlib import Path
import xml.etree.ElementTree as ET
import os
import argparse
parser=argparse.ArgumentParser()
parser.add_argument("--long-fundraiser",action="store_true")
args=parser.parse_args()
long_test="true" if args.long_fundraiser else "false"
root=Path(__file__).resolve().parent.parent
marker="ToilStandaloneSmoke_20260908"
place=root/"cookie-animation-test.rbxlx"
tree=ET.parse(place)
workspace=tree.getroot().find("./Item[@class='Workspace']")
if workspace is None:
    workspace=ET.SubElement(tree.getroot(),"Item",{"class":"Workspace","referent":"RBX_SMOKE_WORKSPACE"})
    workspace_props=ET.SubElement(workspace,"Properties")
    ET.SubElement(workspace_props,"string",{"name":"Name"}).text="Workspace"
flag=ET.SubElement(workspace,"Item",{"class":"StringValue","referent":"RBX_TOIL_SMOKE_MARKER"})
props=ET.SubElement(flag,"Properties")
ET.SubElement(props,"string",{"name":"Name"}).text=marker
ET.SubElement(props,"string",{"name":"Value"}).text=marker
output=root/".studio-stage"/"standalone-smoke.rbxlx"
tree.write(output,encoding="utf-8",xml_declaration=True)
def luau_string(s):
    return "[====["+s+"]====]"
server=(root/"scripts/standalone-smoke.server.luau").read_text(encoding="utf-8")
client=(root/"scripts/standalone-smoke.client.luau").read_text(encoding="utf-8")
source=f"""task.defer(function()
    task.wait(3)
    print("[ToilStandaloneLauncher] probe marker="..tostring(workspace:FindFirstChild('{marker}')~=nil))
    if not workspace:FindFirstChild('{marker}') or game:GetService('RunService'):IsRunning() then return end
    workspace:FindFirstChild('{marker}'):Destroy()
    local server=Instance.new('Script');server.Name='StandaloneSmokeServer';server.Source={luau_string(server)};server:SetAttribute('LongFundraiser',{long_test});server.Parent=game.ServerScriptService
    local client=Instance.new('LocalScript');client.Name='StandaloneSmokeClient';client.Source={luau_string(client)};client:SetAttribute('LongFundraiser',{long_test});client.Parent=game.StarterPlayer.StarterPlayerScripts
    print('[ToilStandaloneTest] launching two-client test')
    local ok,result=pcall(function()return game:GetService('StudioTestService'):ExecuteMultiplayerTestAsync(2,'ToilStandaloneSmoke')end)
    print('[ToilStandaloneLauncher] '..tostring(ok)..' '..game:GetService('HttpService'):JSONEncode(result))
end)
"""
plugin=Path(os.environ['LOCALAPPDATA'])/'Roblox'/'Plugins'/'ToilStandaloneSmoke.rbxmx'
assert not plugin.exists(),"temporary plugin already exists; inspect it before replacing"
r=ET.Element('roblox',{'version':'4'});item=ET.SubElement(r,'Item',{'class':'Script','referent':'RBX_SMOKE_PLUGIN'});pr=ET.SubElement(item,'Properties')
ET.SubElement(pr,'string',{'name':'Name'}).text='ToilStandaloneSmoke'
ET.SubElement(pr,'ProtectedString',{'name':'Source'}).text=source
ET.ElementTree(r).write(plugin,encoding='utf-8',xml_declaration=True)
print(output)
print(plugin)
