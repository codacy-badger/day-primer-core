#pragma once

// Ԥ���峣��
#define _WIN32_WINNT _WIN32_WINNT_MAXVER

// MFC���ͷ�ļ�
#include <afxwin.h>
#include <afxcontrolbars.h>

// MFC���ɵķ���
#include "resource.h"

// Primum CWinAppʵ��
#include "App.h"
extern Primum::App theApp;

// Primum��־����
#include "Logcat.h"
#include <afxcontrolbars.h>
extern Primum::Logcat Log;  // ȫ��ΨһLogcat����
