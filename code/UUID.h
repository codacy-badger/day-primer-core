#pragma once

#include "stdafx.h"

namespace Primum {
	/// ��UUID�����㷨�İ�װ
	class UUID
	{
	public:
		UUID();
		virtual ~UUID() = default;

		CString GetString();

	protected:
		GUID uuid;
		CString uuidString;
	};
}
