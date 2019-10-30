#pragma once

#include "stdafx.h"

namespace Primum {
	/// ����
	/// <summary>
	/// 1. ȫ��Ψһ��ʶ��
	/// 2. ���ں�ʱ������ ����ʱ�� �޸�ʱ��
	/// 3. ��Ҫ�����⣩
	/// 4. ���飨���ģ�
	/// TODO:
	/// 5. �������� Ԥ�Ʒ������ġ�ʵ�ʷ�������
	/// 6. �Ⱦ���ϵ������������ͼ�񻯣�
	/// </summary>
	class Task
	{
	public:
		Task() = default;
		Task(const CString &summary, const CString& detail = "");

		virtual ~Task();

		// ��ȡ������ַ�����ʾ
		CString GetString() const;

	protected:
		UUID uuid;  // ȫ��Ψһ��ʶ��
		CTime modifiedTime;  // �����޸�ʱ��
		CTime createdTime;  // ���񴴽�ʱ��

		CString summary;  // ������Ҫ�����⣩
		CString detail;  // �������飨���ģ�
	};
}
