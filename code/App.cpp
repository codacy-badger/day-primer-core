#include "stdafx.h"
#include "App.h"
#include "FrameWnd.h"
#include "Task.h"

using namespace Primum;

BOOL App::InitInstance()
{
	tasks = new CArray<Task>();

	m_pMainWnd = new FrameWnd();
	m_pMainWnd->CenterWindow();
	m_pMainWnd->ShowWindow(m_nCmdShow);

	Log.I(TEXT("Hello"), Task(TEXT("�峿"), TEXT("���!")).GetString());

	return TRUE;
}

int App::ExitInstance()
{
	// �������е�����
	for (int i = 0, len = tasks->GetSize(); i < len; ++i) {
		const Task & task = tasks->GetAt(i);
		Log.I("Task", task.GetString());
	}

	delete tasks; tasks = nullptr;
	delete m_pMainWnd; m_pMainWnd = nullptr;
	return CWinApp::ExitInstance();
}
