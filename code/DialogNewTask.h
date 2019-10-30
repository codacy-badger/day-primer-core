#pragma once

namespace Primum {
	class DialogNewTask : public CDialogEx
	{
		DECLARE_DYNAMIC(DialogNewTask)

	public:
		DialogNewTask(CWnd* pParent = nullptr);
		virtual ~DialogNewTask();

#ifdef AFX_DESIGN_TIME
		enum { IDD = IDD_DIALOG_NEW_TASK };
#endif

	protected:
		virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

	public:
		DECLARE_MESSAGE_MAP()
		afx_msg void OnBnClickedButtonConfirm();
		afx_msg void OnBnClickedCancel();
		afx_msg void OnBnClickedButtonConfirmAndContinue();

	public:
		CString detail;
		CString summary;
	};

}
