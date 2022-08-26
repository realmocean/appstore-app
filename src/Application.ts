import { ToolbarEx } from '@tuval/components/navigations';
import { ModuleLoader } from '@tuval/core';
import { TApplication } from '@tuval/forms';
import { MainForm } from './MainForm';

const manifest = require('./manifest');
declare var tuval$core;

function App(manifest: any) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        if (tuval$core['__APPS__'] == null) {
            tuval$core['__APPS__'] = {};
        }
        tuval$core['__APPS__'][manifest.application.name] = constructor;
    }
}

@App(manifest)
export class PackageCenter extends TApplication {
    private m_Toolbar: ToolbarEx;
    private m_tbiLabel: any;
    public InitComponents() {

        debugger;
        this.Icon = 'data:image/svg+xml;base64,PHN2ZyBpZD0iYWNlMTI1NWMtOTRlNi00ZDUzLWJiM2EtMzRlY2UyMWQ5MmZhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImE5YWFmMmJiLTJiNjQtNDlmYy05YWViLTM5ZDY4N2E2MDQ3MSIgeDE9IjcuNjMiIHkxPSIxNS4zNCIgeDI9IjcuNjMiIHkyPSI1Ljg0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjY2NjIiAvPjxzdG9wIG9mZnNldD0iMC4xNSIgc3RvcC1jb2xvcj0iI2RhZGFkYSIgLz48c3RvcCBvZmZzZXQ9IjAuNDQiIHN0b3AtY29sb3I9IiNlZWUiIC8+PHN0b3Agb2Zmc2V0PSIwLjcyIiBzdG9wLWNvbG9yPSIjZmJmYmZiIiAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+SWNvbi1nZW5lcmFsLTg8L3RpdGxlPjxwYXRoIGlkPSJmMzU0MjQ4Yi0zNDdmLTRmMzQtYThiMS02MDQxMmQ5NGM4OTgiIGQ9Ik0xNSw0Ljc3aC0xdjEyLjhsMS0xLjkzWiIgZmlsbD0iIzUwZTZmZiIgLz48cGF0aCBpZD0iYmYyMGM4NWYtY2ZiYy00ZTlmLTlmMzUtNWNlY2Q1MzAxNDg1IiBkPSJNMTUsMTUuNjNoMGwtMSwxLjkzLDEtLjgsMS4yMy0uOTVaIiBmaWxsPSIjOWNlYmZmIiAvPjxwYXRoIGlkPSJiZTgwZjkwMi00ODIyLTQ4ZDgtYjFjYy01N2VlNGEzOWU3OTUiIGQ9Ik04LjM5LDIuODZBMS41NywxLjU3LDAsMCwxLDEwLDEuMzVhMS41NywxLjU3LDAsMCwxLDEuNjMsMS41MVY0Ljc3aC43OFYyLjg2QTIuMzUsMi4zNSwwLDAsMCwxMCwuNTdhMi4zNSwyLjM1LDAsMCwwLTIuNCwyLjI5VjQuNzdoLjc4WiIgZmlsbD0iI2EzYTNhMyIgLz48cGF0aCBpZD0iYmIwN2NhNGItZWM0OS00NGE5LTlhOGQtYmIwZjdhOGJlNzY4IiBkPSJNNiwyLjg2QTEuNTcsMS41NywwLDAsMSw3LjYyLDEuMzUsMS41OCwxLjU4LDAsMCwxLDkuMjUsMi44NlY0Ljc3SDEwVjIuODZBMi4zNiwyLjM2LDAsMCwwLDcuNjIuNTdhMi4zNSwyLjM1LDAsMCwwLTIuNCwyLjI5VjQuNzdINloiIGZpbGw9IiM3Njc2NzYiIC8+PHBvbHlnb24gcG9pbnRzPSIxMy45MiA0Ljc3IDEzLjkyIDE3LjU3IDEuNDUgMTYuNTggMS44MyA0Ljc3IDEzLjkyIDQuNzciIGZpbGw9IiMzMmJlZGQiIC8+PHBvbHlnb24gcG9pbnRzPSIxNC45NSA0Ljc3IDE0Ljk1IDE1LjY0IDE2LjE4IDE1LjgyIDE1LjgxIDQuNzcgMTQuOTUgNC43NyIgZmlsbD0iIzMyYmVkZCIgLz48cGF0aCBkPSJNMTIuMTksMTIuMzFhMi4zLDIuMywwLDAsMC0xLjc5LTIuMThBMi44NCwyLjg0LDAsMCwwLDcuNzQsNy4zOCwyLjQ3LDIuNDcsMCwwLDAsNS4yLDlhMi4zLDIuMywwLDAsMC0yLjEzLDIuMzFBMi43NCwyLjc0LDAsMCwwLDUuNjMsMTRoLjIybDQuMTYuMjhoLjExQTIsMiwwLDAsMCwxMi4xOSwxMi4zMVoiIGZpbGw9InVybCgjYTlhYWYyYmItMmI2NC00OWZjLTlhZWItMzlkNjg3YTYwNDcxKSIgLz48L3N2Zz4=';
        const fileExprorer = new MainForm();


        //fileExprorer.Controls.Add(button);
        this.SetMainForm(fileExprorer);
        setTimeout(()=> this.Start(), 100);
    }
}