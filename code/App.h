#pragma once

#include "stdafx.h"
#include "Task.h"

namespace Primum {
	class App :
		public CWinApp
	{
	public:
		App() = default;
		~App() = default;

		// �����б�
		CArray<Primum::Task> * tasks = nullptr;

		BOOL InitInstance();
		virtual int ExitInstance();
	};
}
