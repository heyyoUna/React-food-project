import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import MemberNavbar from '../../components/member/MemberNavbar'

function MemberProfile(props) {

  return (
    <>
      <div className="karin-profile-container">
        <div className="row karin-profile-title">
          <h1 id="karin-profile-h1">更改密碼</h1>
        </div>
        <div className="row karin-profile-table">
          <MemberNavbar />
          <div className="karin-profile-main col-8">
            <form name="memberForm">
              {/* 更換密碼 */}
               <div className="karin-form-group row">
                  <label for="password" className="col-sm-3 col-form-label">舊密碼</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="karin-profile-form-control"
                      id="oldpassword"
                    />
                  </div>
                </div>
                <div className="karin-form-group row">
                  <label for="password" className="col-sm-3 col-form-label">新密碼</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="karin-profile-form-control"
                      id="newpassword" />
                  </div>
                </div>
                <div className="karin-form-group row">
                  <label for="password" className="col-sm-3 col-form-label">確認新密碼</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="karin-profile-form-control"
                      id="checknewpassword" />
                  </div>
                </div>
              {/* 更換密碼  */}
              {/* 送出按鈕  */}
              <div className="karin-form-group row">
                <button type="submit" className="karin-profile-btn btn-primary">確認送出</button>
              </div>
              {/* 送出按鈕  */}
            </form>
          </div>
          <div className="karin-profile-right col-2"></div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberProfile)